// let getUserInfo = () => {
//     fetch("https://api.openweathermap.org/data/2.5/onecall?lat").then((response) => {
//         response.json().then((data) => {
//             console.log(data);
//         })
//     });
   
//    };
//    getUserInfo();

var response = fetch("https://api.openweathermap.org/data/2.5/onecall?lat");
console.log(response);

console.log("one")