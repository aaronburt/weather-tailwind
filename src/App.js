import { useEffect, useState } from "react"

export default function App(){

    const [weather, setWeather] = useState('');

    useEffect(()=>{

        async function getWeather(){
            try {
                const response = await fetch('https://weather.streamsave.xyz/get?city=congleton');
                const data = await response.json();
                const daily = data.daily;
                const baseIconUrl = "https://openweathermap.org/img/wn/";

                const minmax = Object.keys(daily).map(([k, v]) => { 
                    if(k >= 5) return;
                    let day = daily[k];
                    let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"];
                    return (
                        <div key={k} className="text-center text-black divide-x-2 hover:bg-slate-100">
                            <div className="font-light text-2xl">{days[new Date(day.dt * 1000).getDay()]}</div>
                            <div>{Math.ceil(day.temp.max)}°c</div>
                            <div>{Math.floor(day.temp.max)}°c</div>
                            <div>{day.weather[0].main}</div>
                            <div className="justify-center">
                                <img className="mx-auto" src={baseIconUrl + day.weather[0].icon + '@2x.png'}/>
                            </div>
                        </div>
                    );
                });
            
                setWeather(minmax);
            } catch(err){
                return;
            }
        }

        getWeather();


    }, []);


    return(
        <div className="h-screen w-full flex">
            <div className="m-auto w-11/12 grid grid-cols-5 p-4 bg-white rounded-xl">
                {weather}
            </div>
        </div>
    )




}