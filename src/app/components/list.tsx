import Link from "next/link";
import Image from 'next/image';

export default async function  List() {

      const response = await fetch('https://pokeapi.co/api/v2/type/');
      const data = await response.json();
      console.log(data)
 

      function capitalizeFirstLetter(string:string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      function imgURL(url:string){
        let St = url.replace('https://pokeapi.co/api/v2/type/' , '');
        St =  St.replace('/' , '');
        return {id: Number(St), img : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/'+ St +'.png'};
      }


      return (
        <div className="grid grid-cols-2 md:grid-cols-4 py-20">
             {data.results.map((x : any)=>
             imgURL(x.url).id < 30 && <Link href={'category/' + x.name} className="poke-card m-4 bg-white/5 hover:bg-white/10">
               <Image className="m-auto" src={imgURL(x.url).img} height={50} width={'200'} />
              </Link>)}
        </div>
      );

      
}
    