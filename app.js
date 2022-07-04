let campeones = []; //Lista de campeones
let favoritos = []; //Lista de campeones favoritos


// Lectura de los campeones desde el archivo JSON
fetch('data/lol-champions.json')
.then(response => response.json())
.then(data => {
    campeones = data;
    render(campeones,false);
});

//Imprimir en las tarjetas
function render(campeones,btnDelete){
    result.innerHTML = "";
    for(var i in campeones){
        
        let column = document.createElement("div");
        column.classList.add("col-3");
        
        let button = document.createElement("button");
        button.setAttribute("data-number",campeones[i].key);
        button.setAttribute("data-nombre",campeones[i].name);
        button.setAttribute("data-index",i);

        if(btnDelete === true){ //Botón eliminar
            button.innerHTML="Eliminar de favorito";
            button.classList.add("btn","mt-3", "btn-danger");
            button.addEventListener("click",function(evt){
                let miboton = evt.target;
                let name = miboton.dataset.nombre;
                let num = miboton.dataset.number;
                let index = miboton.dataset.index;
                let aux_favoritos =[];
    
                if(favoritos.length>0){         
                    aux_favoritos = favoritos.filter(function(favorito){
                        return favorito.key === num;
                    });
                }
                if(aux_favoritos.length>0){
                    favoritos.splice(index,1);
                    let f = JSON.stringify(favoritos);
                    localStorage.setItem("favoritosStorage", f);
                    alert(`El campeón ${name} se ha eliminado de Favoritos`);
                    listFavs();
                }else{
                    alert(`El campeón ${name} no estaba en la lista`);
                }
    
            });
        }else{
            //Botón de favoritos
            button.innerHTML="Agregar a favorito";
            button.classList.add("btn","mt-3", "btn-warning");
            button.addEventListener("click",function(evt){
                let miboton = evt.target;
                let name = miboton.dataset.nombre;
                let num = miboton.dataset.number;
                let index = miboton.dataset.index;
                let aux_favoritos =[];
    
                if(favoritos.length>0){            
                    aux_favoritos = favoritos.filter(function(favorito){
                        return favorito.key === num;
                    });
                }
    
                if(aux_favoritos.length<=0){
                    favoritos.push(campeones[index]);
                    let f = JSON.stringify(favoritos);
                    localStorage.setItem("favoritosStorage", f);
                    alert(`El campeón ${name} se ha agregado a favoritos`);
                }else{
                    alert(`El campeón ${name} ya estaba en la lista`);
                }
    
            });

        }
        


        let card = `<div class="card mt-4">
                <img data-number="${campeones[i].key}" src="${campeones[i].icon}" loading="lazy" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${campeones[i].name}</h5>
                    <p class="card-text">#${campeones[i].key}</p>

                    <button class="btn btn-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample${i}" aria-controls="offcanvasExample">+</button>

                    <div class="offcanvas offcanvas-start bg-canvas" tabindex="-1" id="offcanvasExample${i}" aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">${campeones[i].name} - ${campeones[i].title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <img data-number="${campeones[i].key}" src="${campeones[i].icon}" loading="lazy" class="center-img" >
                            <div class="canvas-text">
                            ${campeones[i].description}
                            </div>
                        </div>
                    </div>`;

            let tipos = campeones[i].tags;

            for(var j=0; j<tipos.length; j++){
                card+=`<span class="badge ms-1 text-bg-primary">${tipos[j]}</span>`;
            }

        card+=`
            </div>
            </div>`;


        column.innerHTML=card;
        column.appendChild(button);
        result.append(column);
    }
    
}


if(localStorage.getItem("favoritosStorage")){
    favoritos= JSON.parse(localStorage.getItem("favoritosStorage"));
}



const formSearch = document.querySelector("#search-campeon");
const result = document.querySelector("#resultado");
const input = document.querySelector("#campeon");

//Busquedas por tipo
const buttonMage = document.querySelector("#button-mage");
const buttonAssassin = document.querySelector("#button-assassin");
const buttonTank = document.querySelector("#button-tank");
const buttonSupport = document.querySelector("#button-support");
const buttonMarksman = document.querySelector("#button-marksman");
const buttonFighter = document.querySelector("#button-fighter");

const buttonAsc = document.querySelector("#button-asc");
const buttonDesc = document.querySelector("#button-desc");
const buttonAscNum = document.querySelector("#button-asc-num");
const buttonDescNum = document.querySelector("#button-desc-num");
const buttonFavoritos = document.querySelector("#button-favoritos");

formSearch.addEventListener("submit",search);
input.addEventListener("keyup",search)

//Busquedas por tipo
buttonMage.addEventListener("click",searchByType);
buttonAssassin.addEventListener("click",searchByType);
buttonTank.addEventListener("click",searchByType);
buttonSupport.addEventListener("click",searchByType);
buttonMarksman.addEventListener("click",searchByType);
buttonFighter.addEventListener("click",searchByType);

//Ordenamiento 
buttonAsc.addEventListener("click", orderAsc)
buttonDesc.addEventListener("click",orderDesc)
buttonAscNum.addEventListener("click",reiniciar)
buttonDescNum.addEventListener("click",orderNumDesc)

buttonFavoritos.addEventListener("click",listFavs)

function listFavs(){
    render(favoritos,true);
}

//Ordernar ascendente por ID
function reiniciar(){
    campeones.sort(function(campeon1,campeon2){
        return campeon1.key - campeon2.key;
    });
    render(campeones,false);
}

//Ordenar descendente por ID
function orderNumDesc(){
    campeones.sort(function(campeon1,campeon2){
      return campeon2.key - campeon1.key;
    });
    render(campeones,false);
}

//Ordenar A-Z
function orderAsc(){
    campeones.sort(function(camepon1,camepon2){
        if(camepon1.name > camepon2.name){
            return 1; 
        }else{
            return -1; 
        }
    });
    render(campeones,false);
}

//Ordendar Z-A
function orderDesc(){
    campeones.sort(function(camepon1,camepon2){
        if(camepon1.name < camepon2.name){
            return 1; 
        }else{
            return -1; 
        }
    });
    render(campeones,false);
}

//Buscar por nombre
function search(e){
    e.preventDefault();
    reiniciar(); 
    let s = input.value;
    let campeonesFiltrados = campeones.filter(function(campeon){
        return campeon.name.toLowerCase().includes(s.toLowerCase());
    });
    render(campeonesFiltrados,false);
}

//Buscar por tipo
function searchByType(e){
    let t = e.target.value;
    console.log(t);
    let campeonesFiltrados = campeones.filter(function(camepon){
        return camepon.tags.includes(t);
    });
    render(campeonesFiltrados,false);
}


