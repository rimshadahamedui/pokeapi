


"use client";
import Image from 'next/image';
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default async function singleitem({ params }: { params: { id: string } }) {

 
          
  
    let options = {
      colors : ['#feca1b'],
      series: [{
        data: [],
      }],
      chart: {
        type: 'bar',
        toolbar: { show:false },
      },
      grid:{
        show: false,
      },
      tooltip: {
        enabled: false,
      },

      plotOptions: {
        bar: {
          borderRadius: 10,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '19px',
          fontWeight: 700,
          colors: ['#000'],
        }
      },
      xaxis: {
        labels: {show: false,},
        axisBorder:{show: false},
        axisTicks:{show: false},
        categories: [],
      },
      yaxis:{
        labels: {
          style: {
            fontSize: '15px',
            colors: ['#fff'],
          }
        }
      }
    }

  


  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + params.id );
  const data = await response.json();
  function formatName(string:string) {
    let x = string.replace('-' , ' ')
    return x.charAt(0).toUpperCase() + x.slice(1);
  }

  data.stats.map((x : any)=>{ 
  options.series[0].data.push(x.base_stat)
  options.xaxis.categories.push(formatName(x.stat.name))})


  console.log(data);

  

  function extractID(string:string){
    let St = string.replace('https://pokeapi.co/api/v2/pokemon/' , '');
    St =  St.replace('/' , '');
    return St;
  }

  function  LoadImage(name: string , id: string){
    if(Number(id) > 1000 ){
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ extractID(url) +'.png';
    } else{
      return 'https://img.pokemondb.net/sprites/home/shiny/'+ name +'.png';
    }
  }



      return (
        <main className="container mx-auto">
          
           <div className="grid grid-cols-1 md:grid-cols-2 mt-20">
            <div className='bg-white/5 rounded-xl p-6 m-4'>
            <h1 className="text-5xl font-bold my-6 block text-center w-100">{formatName(data.name)}</h1>
            <Image key={data.name} className="m-auto mb-5"
             src={LoadImage(data.name , data.id)}
             width={300}
             height={300}
             alt={data.name} />
            </div>
           
            <div className='bg-white/5 rounded-xl p-6 m-4'>
            <ApexChart options={options} series={options.series} type="bar"  height={450} width={450} />
            </div>
           </div>
    
        
    
        </main>
      );
}