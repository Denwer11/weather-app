import jQuery from "jquery";



export const getWeatherForecast = () =>{
    jQuery(($)=>{
        $.noConflict();
        const $API_KEY = "cd34f692e856e493bd936095b256b337";
        $.ajax({
            url:`https://api.openweathermap.org/data/2.5/forecast?q=Nigeria&appid=${$API_KEY}&lang=ru`,
            success: (result, status, xhr) =>{
                if(result.cod == 200)
                {
                   return result;
                }

               
            },
    

            error: (xhr, status, error) =>{
                console.log(error);
            }
        });
    
    
    })
    
}
