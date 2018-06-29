

Module.register("MMM-Bysykkel", {

	defaults: {
		updateInterval: 1000	// How often we would call the API's in milliseconds. (Default 15 seconds)
	},

	getStyles: function () {
		return ["style.css"];
	},

	getTranslations: function() {
		return {
			en: "translations/en.json",
			nb: "translations/nb.json"
		}
	},

	start: function() {

		// Request data every {updateInterval} ms.
		const self = this;
		this.requestData();

		setInterval(function() {
			self.requestData();
		}, this.config.updateInterval);
	},

	getDom: function() {
		const wrapper = document.createElement("div");
		wrapper.className = "wrapper";

		if (!this.fetchedData) {

			// Top section w/logo
			const top = document.createElement("div");
			top.className = "top";

			const logo = document.createElement("img");
			logo.src = this.getImage("bysykkel-bergen"); // TODO: Make it choose the correct img
			top.appendChild(logo);

			wrapper.appendChild(top);

			// Bottom section with from, eta and to
			const bottom = document.createElement("div");
			bottom.className = "bottom";

			const from = this.createInfoSection("bike", 3, 25, "Cornerteateret");
			const eta = this.createEtaSection("~10 min");
			const to = this.createInfoSection("lock-open", 12, 25, "Klostertet");

			bottom.appendChild(from);
			bottom.appendChild(eta);
			bottom.appendChild(to);
			wrapper.appendChild(bottom);
		} else {
			wrapper.innerHTML = this.translate("LOADING");
		}
		return wrapper;
	},

	createInfoSection: function(iconName, m, n, name) {
		const section = document.createElement("div");
		section.className = "section";

		const top = document.createElement("div");
		const icon = document.createElement("div");
		const img = document.createElement("img");
		img.src = this.getImage(iconName);
		icon.appendChild(img);
		top.appendChild(icon);

		const mOfN = document.createElement("div");
		const span = document.createElement("span");
		span.className = "big";
		span.innerHTML = m;
		mOfN.className = "bold";
		mOfN.appendChild(span);
		mOfN.innerHTML += "/" + n;
		top.appendChild(mOfN);

		const bottom = document.createElement("div");
		bottom.innerHTML = name;

		section.appendChild(top);
		section.appendChild(bottom);
		return section;
	},

	createEtaSection: function(text) {
		const section = document.createElement("div");
		section.className = "section";

		const top = document.createElement("div");
		const img = document.createElement("img");
		img.src = this.getImage("nav-dots");
		top.appendChild(img);

		const bottom = document.createElement("div");
		bottom.innerHTML = text;

		section.appendChild(top);
		section.appendChild(bottom);
		return section;
	},

	getImage: function(name) {
		return "/modules/MMM-Bysykkel/img/" + name + ".svg";
	},

	/*getImagesPath: function(cb) {
		const req = new XMLHttpRequest();
		const self = this;
		req.open("GET", "/MMM-Bysykkel/images", true);

		req.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					console.log(this);
					cb(this.response);
				}
			}
		};
		req.send();
	},*/

	requestData: function() {
		console.log(this.translate("LOADING") + ": " + this.name);

	}
});
