import "./style.css";

let lastKnownScrollPosition = 0;
let ticking = false;

document.addEventListener("scroll", () => {
	lastKnownScrollPosition = window.scrollY;
	if (
		document.getElementsByClassName("app").length > 1 &&
		lastKnownScrollPosition === 0
	) {
		removeNode(1);
	}
	if (!ticking) {
		window.requestAnimationFrame(() => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
				cloneNode();
			}
			ticking = false;
		});
		ticking = true;
	}
});

function cloneNode() {
	const app = document.getElementsByClassName("app")[0].cloneNode(true);
	document.getElementsByTagName("main")[0].append(app);
	if (document.getElementsByClassName("app").length > 2) removeNode(0);
}

function removeNode(index) {
	document.getElementsByClassName("app")[index].remove();
}
