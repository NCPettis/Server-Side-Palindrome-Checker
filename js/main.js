document.querySelector('#clickMe').addEventListener('click', checkInput)

function checkInput(){

  const userWord = document.querySelector("#userWord").value;

  fetch(`/api?pali=${userWord}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);

      document.querySelector("#result").textContent = data.pali
  
    });

}
