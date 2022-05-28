let LoadBtn=document.getElementsByClassName("btnLoadTimes")[0]
let adhan=document.getElementById("adhan")
let table= document.getElementById("times-table")
let tbody= document.getElementById("tbody")

// let th= document.querySeletorAll('#times-table:nth-child(2)')

let preloader= document.getElementsByClassName("preloader")[0]
adhan.onsubmit=function(e){

    e.preventDefault();
  //  console.log(th)
  
    let year =document.getElementById("year").value
    let month=document.getElementById("month").value;
    let  isAnnual=document.getElementById("annual").checked
console.log(month)
let http= new XMLHttpRequest()

http.onreadystatechange=function(e){
  
    if(http.readyState===4 && http.status===200){

       let response=JSON.parse(http.responseText)

       
           let data=response.data

           if(isAnnual){
            // data.foreEach()


           }
           else{
            tbody.innerHTML=""
            
             data.forEach(day => {
               let tr=document.createElement("tr")
               
               let tdDate=document.createElement("td")
               tdDate.innerText=day.date.readable
               console.log(day.date.readable)

               tr.appendChild(tdDate)
               
                 for(let key in day.timings){
               let td=document.createElement("td")

                    td.innerText=day.timings[key].substring(0,day.timings[key].length-6)
                    tr.appendChild(td)
                 }

             
                tbody.appendChild(tr)
            })
        
           }
      
        preloader.classList.remove("active")
        table.classList.add("active")

        
    }
    else if(http.readyState===4 && http.status!==200){
           alert(JSON.parse(http.responseText).data)
    }
}

preloader.classList.add("active")
table.classList.remove("active")
const url=`http://api.aladhan.com/v1/calendarByCity?city=Baku&country=AZ&method=2&month=${month}&year=${year}&annual=${isAnnual}`

// `http://api.aladhan.com/v1/hijriCalendarByCity?city=Baku&country=AZ&method=2&month=${month}&year=${year}&annual=${isAnnual}`
// : http:api.aladhan.com/v1/hijriCalendarByCity?
// `http://api.aladhan.com/v1/hijriCalendarByCity?city=Baku&country=AZ&month=${month}&year=${year}&annual=${isAnnual}`
http.open("GET",url);
 console.log(month,year,)
http.send()


}

