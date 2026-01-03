 checkAuth();
        document.getElementById('sidebar-container').innerHTML = getSidebar();

        console.log(firebase.database);


        let categories = getData('categories');
        const tableBody = document.getElementById('table-body');
        const modal = document.getElementById('modal');
        const modalForm = document.getElementById('modal-form');

        function render() {
            tableBody.innerHTML = categories.map(cat => `
                <tr>
                    <td>#${cat.id}</td>
                    <td>${cat.name}</td>
                    <td>${cat.count}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="edit(${cat.id})">Edit</button>
                        <button class="action-btn delete-btn" onclick="del(${cat.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }

        function openModal(id = null) {
            document.getElementById('edit-id').value = id || '';
            document.getElementById('modal-title').textContent = id ? 'Edit Category' : 'Add Category';
            if (id) {
                const cat = categories.find(c => c.id === id);
                document.getElementById('cat-name').value = cat.name;
                document.getElementById('cat-count').value = cat.count;
            } else {
                modalForm.reset();
            }
            modal.classList.add('active');
        }

        function closeModal() {
            modal.classList.remove('active');
        }

        function edit(id) {
            openModal(id);
        }

        function del(id) {
            if(confirm('Are you sure?')) {
                categories = categories.filter(c => c.id !== id);
                setData('categories', categories);
                render();
            }
        }

        modalForm.onsubmit = async (e) => {
            e.preventDefault();
            const id = document.getElementById('edit-id').value;
            const name = document.getElementById('cat-name').value;
            const count = document.getElementById('cat-count').value;


//          push => make new key
//          set => set data / replace

            var catkey = firebase.database().ref("CATEGORY").push().getkey()

            var object = {
                catname : name,
                count:count,
                catkey:catkey
            }

            console.log(object)

            await  firebase.database().ref("CATEGORY").child(catkey).set(object)
            alert("add new category")

            closeModal();
        };

async function  getAllCategory(){
    await firebase.database().ref("CATEGORY").get().then((db)=>{ 
        console.log(db.val())
        var data = object.values(db.val())
        console.log(data)
})
}

        // render();