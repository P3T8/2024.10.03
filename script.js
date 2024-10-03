const backendurl = "https://retoolapi.dev/SZwUUA/data";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("get").addEventListener('click', async () => {
        fetch(backendurl)
            .then(response => response.json())
            .then(data => Datafutar(data))
            .catch(error => console.error("Error fetching data:", error));
    });


    document.getElementById("update").addEventListener('click', async () => {
        let id = document.getElementById("id").value;
        let nev = document.getElementById("nev").value;
        let email = document.getElementById("email").value;
        let bool = document.getElementById("bool").checked;

        let futar = { id: id, nev: nev, email: email, bool: bool };
        let ModositUrl = `${backendurl}/${id}`;

        let MyHeaders = new Headers();
        MyHeaders.append("Content-Type", "application/json");

        try {
            let response = await fetch(ModositUrl, {
                method: "PUT",
                headers: MyHeaders,
                body: JSON.stringify(futar)
            });

            if (response.ok) {
                alert("Sikeres frissítés");
            } else {
                alert("Sikertelen frissítés");
            }
        } catch (error) {
            console.error("Error updating data:", error);
            alert("Hiba történt frissítés közben");
        }
    });
});


function Datafutar(data) {
    let szoveg = "";
    data.forEach(item => {
        szoveg += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${item.nev}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${item.email}</h6>
                <p class="card-text">${item.bool}</p>
                <a class="btn btn-outline-success" onclick="Modosit(${item.id})">Update</a>
                <a class="btn btn-outline-danger" onclick="Torol(${item.id})">Delete</a>
            </div>
        </div>`;
    });
    document.getElementById("card").innerHTML = szoveg;
}

function Modosit(id) {
    fetch(`${backendurl}/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("id").value = data.id;
            document.getElementById("nev").value = data.nev;
            document.getElementById("email").value = data.email;
            document.getElementById("bool").checked = data.bool;
        })
        .catch(error => console.error("Error loading data for modification:", error));
}


function Torol(id) {
    let deleteUrl = `${backendurl}/${id}`;
    
    fetch(deleteUrl, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Sikeres törlés");
            document.getElementById("card").innerHTML = ''; 
        } else {
            alert("Sikertelen törlés");
        }
    })
    .catch(error => {
        console.error("Error deleting data:", error);
        alert("Hiba történt törlés közben");
    });
}
