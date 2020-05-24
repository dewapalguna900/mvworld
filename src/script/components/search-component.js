class SearchComponent extends HTMLElement {
    connectedCallback() {
        this.setAttribute("class", "col-md-12");
        this.render();
    }

    get value() {
        return this.querySelector("#txtMovie").value;
    }

    set value(nilai) {
        this.querySelector("#txtMovie").value = nilai;
    }

    set placeholder(txtPlaceholder) {
        this.querySelector("#txtMovie").placeholder = txtPlaceholder;
    }

    set disabled(status) {
        this.querySelector("#txtMovie").disabled = status;
    }

    render() {
        this.innerHTML = `
		<div class="col-md-12">
			<h1 class="text-center">Pencarian Movie</h1>
		</div>
		<div class="col-md-12 mt-2">
			<div class="input-group mb-3">
			  <div class="input-group-prepend">
			    <select class="custom-select" id="optFilter">
			    	<option value="judul">By Judul</option>
			    	<option value="tahun">By Tahun</option>
			    	<option value="genre">By Genre</option>
			    </select>
			  </div>
			  <input type="text" id="txtMovie" class="form-control" placeholder="Nama Movie/Animasi...">
			</div>
		</div>
		<div class="col-md-12" id="selectGenre"></div>
		<div class="col-md-12 text-center">
			<button type="button" class="btn btn-primary" id="btn-search">Search</button>
		</div>	
		`;
    }
}

customElements.define("search-component", SearchComponent);