document.addEventListener('DOMContentLoaded', function () {
    const id_set = ['tab1', 'tab3', 'tab4', 'tab5', 'tab6', 'tab7', 'tab8'];
    const modal = document.getElementById('myModal');
    const modalBody = document.getElementById('modal-body');
    const span = document.getElementsByClassName('close')[0];

    id_set.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', function () {
                modalBody.innerHTML = this.innerHTML;
                modal.style.display = 'flex';
            });
        }
    });

    span.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});