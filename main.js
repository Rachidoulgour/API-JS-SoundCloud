// document.addEventListener('DOMContentLoaded', ()=>{

    SC.initialize( {
        client_id: 'CLIENT_ID'});
    document.querySelector('.searchSong').addEventListener('submit', event=>{
        event.preventDefault();
        console.log(event.target.songKeyWord.value);
        SC.get( '/tracks', {
            q: event.target.songKeyWord.value
        })
        .then(res=>{
            console.log(res)
            for (let i = 0; i<res.length; i++){
                const image = document.createElement('img')
                image.draggable= 'true';
                
                image.src = res[i].artwork_url
                image.id = res[i].id
                image.title = res[i].title
                image.onload = function(event){
                    this.addEventListener('ondragstart', drag, false)};
                document.querySelector('.resultado').append(image)
                // let titulo = document.createElement('p')
                // titulo.innerText = image.title
                // document.querySelector('img').appendChild(titulo)
            }
            
            // document.querySelector('img')
            // .addEventListener(drag, event => {
            //     console.log(event.target);
            // })
        });
        
    });
    // document.querySelector('.resultado').addEventListener(function drag(event) {
    //     event.dataTransfer.setData("text", event.target.image.src);
    //   })
    function drag(event) {
        
        event.dataTransfer.setData("text", event.target.id, event.target.src);
        document.querySelector('img').src=event.target.src
      }      
      
    function allowDrop(event) {
        event.preventDefault();
      }
          
    function drop(event) {
        event.preventDefault();
        let data = event.dataTransfer.getData("text", event.target.src);
      
        event.target.appendChild(document.querySelector('img'));
        // console.log(data)
        SC.stream('tracks/'+data).then(function(player){
            console.log(data)
            player.play();
            
          });
//           const play = document.createElement('button')
//  document.querySelector('.dropping').appendChild(play);
//  play.innerText = 'Pause';
//  play.addEventListener('click', event =>{
//     event.preventDefault();
//     var pauser = SC.stream('/tracks/'+data).then(function(pauser){
//         console.log(data)
//         pauser.pause();
//       });
//  })
//           SC.oEmbed('https://soundcloud.com/forss/flickermood', {
//   auto_play: true
// }).then(function(embed){
//   console.log('oEmbed response: ', embed);
// });
//       }

 }
 