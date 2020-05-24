class HeaderContent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
		<div class="jumbotron jumbotron-fluid">
		  <div class="container">
		    <h1 class="display-4">Selamat Datang di MovieWorld</h1>
		    <p class="lead">Website ini bertujuan untuk memberikan informasi mengenai movie termasuk live-action maupun animasi yang ada di dunia.</p>
		  </div>
		</div>
		`;
    }
}

customElements.define("header-content", HeaderContent);