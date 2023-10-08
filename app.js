import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, push, update, remove, onChildAdded } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
var firebaseConfig = {
    apiKey: "AIzaSyCMXlB2fmUSP3HEpSUE2kUDyY3KbHjrR-w",
    authDomain: "to-do-app-7edb8.firebaseapp.com",
    projectId: "to-do-app-7edb8",
    storageBucket: "to-do-app-7edb8.appspot.com",
    messagingSenderId: "644516930741",
    appId: "1:644516930741:web:c3e7c80f18d922f45a8afc"
};

var app = initializeApp(firebaseConfig);
var DATABASE = getDatabase(app)
var item = document.getElementById("inp")
var renderItems = document.getElementById("renderItems")

window.addItem = function () {
    if (item.value != '') {
        var userItem = {
            item: item.value,

        }
        item.value = ''
        var refKey = ref(DATABASE)
        var itemKey = push(refKey).key;  // item id generated
        userItem.id = itemKey;          // id property added to userItem
        var reference = ref(DATABASE, `Items/${userItem.id}`)
        set(reference, userItem)           // set data in database

    }
    else {
        alert("Enter your item 1st")
    }
}

var items = []
function render(data) {
    if (data) {
        items.push(data);
    }
    renderItems.innerHTML = '';
    for (var i = 0; i < items.length; i++) {
        renderItems.innerHTML += `<li class="listItem"> <span class="listContent">${items[i].item}</span>
        <button onclick="editItem(${i},'${items[i].id}')" title="Edit item"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="dltItem(${i},'${items[i].id}')" title="Delete item"><i class="fa-solid fa-trash"></i></button>
        </li>`
    }
}


window.editItem = function (index, id) {
    var updatedItem = prompt("Enter new item")
    items[index].item = updatedItem;
    var reference = ref(DATABASE, `Items/${id}`)
    update(reference, {
        item: updatedItem,
    })
    render()
}

window.dltItem = function (index, id) {
    items.splice(index, 1)
    var reference = ref(DATABASE, `Items/${id}`)
    remove(reference)
    render()
}


window.dltAllItems = function () {
    items.splice(0)
    var reference = ref(DATABASE, `Items`)
    remove(reference)
    render()

}


function getDataFromDatabase() {

    var reference = ref(DATABASE, "Items")
    onChildAdded(reference, function (data) {

        console.log("data")
        console.log(data)
        console.log(data.val())
        render(data.val())
    })

}


window.onload = getDataFromDatabase()
