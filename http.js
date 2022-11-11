import http from "https";

http.get("https://reqres.in/api/users", (res) => {
  let content = "";
  //console.log(res); // not the result but an object

  res.on("data", (data) => {
    console.log(data.toString());
  });

  res.on("end", () => {
    console.log(content);
  });

  res.on("error", (err) => {
    console.log("error occured");
  });
});

/* 
http is used to interact with the server by sending http requests/ or we can use Axios.
Get method - To send a get request to the api. (The response will be an object, we get the data from the data property from the response object)

Once the response is received we pass it as an argument to the function for further processing

.on method - This method is used to listen to events when our app receives msg from the server. It is used to perform some operation on the received response object

data - We take the data from the response for further operation
end - On connection end
error - When a error occurs in the request like network error etc

(NOTE: The data is received in chunks ie part by part so to display all data at a time append it as soon as it is recived)
*/
