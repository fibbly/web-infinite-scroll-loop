import "./style.css";

let lastKnownScrollPosition = 0;

// this is the element that will be duplicated when user scrolls up or down
const node = document.getElementsByClassName("app")[0];

// this is the parent element that will contain all of the duplicated elements
const parent = document.getElementsByTagName("main")[0];

document.addEventListener("scroll", () => {
	/*
	 * The read-only scrollY property of the Window interface returns
	 * the number of pixels that the document is currently scrolled vertically.
	 */
	lastKnownScrollPosition = window.scrollY;

	window.requestAnimationFrame(() => {
		// detect if user has scrolled to the bottom of the page
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			appendNode();
		}
		// detect if user has scrolled to the top of the page
		if (lastKnownScrollPosition < 1) {
			prependNode();
		}
	});
});

function prependNode() {
	console.log("top");
	const firstNode = document.getElementsByClassName("app")[0];
	parent.prepend(node.cloneNode(true));
	window.scrollTo(0, firstNode.offsetTop);
	// remove the last node in the list of duplicate elements
	removeNode(document.getElementsByClassName("app").length - 1);
}

function appendNode() {
	console.log("bottom");
	parent.append(node.cloneNode(true));
	// remove a node if duplicate elements exceed more than two
	if (document.getElementsByClassName("app").length > 2) {
		removeNode(0);
	}
}

function removeNode(index) {
	document.getElementsByClassName("app")[index].remove();
}
