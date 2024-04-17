
import Link from "next/link";
import Image from 'next/image';
export default async function singlecategory({ params }: { params: { name: string } }) {
  const response = await fetch('https://pokeapi.co/api/v2/type/' + params.name );
  const data = await response.json();
  console.log(data);

  function capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function extractID(string:string){
    let St = string.replace('https://pokeapi.co/api/v2/pokemon/' , '');
    St =  St.replace('/' , '');
    return St;
  }

  function  LoadImage(name: string , url: string){
    if(Number(extractID(url)) > 1000 ){
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ extractID(url) +'.png';
    } else{
      return 'https://img.pokemondb.net/sprites/home/shiny/'+ name +'.png';
    }
  }

  let search = '';



      return (
        <main className="container mx-auto">
            <h1 className="my-6 text-center text-4xl">Category: {params.name}</h1>

            

            <div className="grid grid-cols-2 md:grid-cols-4">
             {data.pokemon.map((x : any)=>
             
             x.pokemon.name.toLowerCase().includes(search.toLowerCase()) &&<Link href={'/pokemon/'+ extractID(x.pokemon.url)} className="poke-card m-4 bg-white/5 hover:bg-white/10">
             <Image key={x.name} className="m-auto mb-5"
             src={LoadImage(x.pokemon.name , x.pokemon.url)}
             width={200} 
             height={200} 
             alt={x.pokemon.name} />
              {capitalizeFirstLetter(x.pokemon.name)}
              <div className="text-white/50 bg-white/5 mt-2 max-w-20 m-auto p-1">#{extractID(x.pokemon.url)}</div>
              </Link>)}
            </div>
        </main>
      );
}