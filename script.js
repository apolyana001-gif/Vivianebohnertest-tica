const visualizadorImagem = document.querySelector(".visualizador-imagem");
const imagemAmpliada = visualizadorImagem?.querySelector("img");
let botaoFotoAtivador = null;
let rolagemAntesDaFoto = 0;
const botaoMenuMobile = document.querySelector(".menu-mobile");
const menuPrincipal = document.querySelector("#menu-principal");

document.querySelectorAll(".procedimento-toggle").forEach((botao) => {
	botao.addEventListener("click", () => {
		const detalhes = document.getElementById(botao.getAttribute("aria-controls"));
		if (!detalhes) return;

		const expandido = botao.getAttribute("aria-expanded") !== "true";
		botao.setAttribute("aria-expanded", String(expandido));
		botao.querySelector("span").textContent = expandido ? "−" : "+";
		detalhes.hidden = !expandido;
	});
});

const fecharMenuMobile = (restaurarFoco = false) => {
	if (!botaoMenuMobile || !menuPrincipal) return;

	menuPrincipal.classList.remove("ativo");
	botaoMenuMobile.setAttribute("aria-expanded", "false");
	botaoMenuMobile.setAttribute("aria-label", "Abrir menu");
	botaoMenuMobile.textContent = "☰";

	if (restaurarFoco) botaoMenuMobile.focus();
};

botaoMenuMobile?.addEventListener("click", () => {
	if (!menuPrincipal) return;

	const abrirMenu = botaoMenuMobile.getAttribute("aria-expanded") !== "true";
	menuPrincipal.classList.toggle("ativo", abrirMenu);
	botaoMenuMobile.setAttribute("aria-expanded", String(abrirMenu));
	botaoMenuMobile.setAttribute("aria-label", abrirMenu ? "Fechar menu" : "Abrir menu");
	botaoMenuMobile.textContent = abrirMenu ? "×" : "☰";

	if (abrirMenu) menuPrincipal.querySelector("a")?.focus();
});

menuPrincipal?.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => fecharMenuMobile(true));
});

document.addEventListener("click", (event) => {
	if (
		botaoMenuMobile?.getAttribute("aria-expanded") === "true" &&
		!menuPrincipal?.contains(event.target) &&
		!botaoMenuMobile.contains(event.target)
	) {
		fecharMenuMobile();
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && botaoMenuMobile?.getAttribute("aria-expanded") === "true") {
		fecharMenuMobile(true);
	}
});

document.querySelectorAll(".resultados-galeria, .sua-experiencia-galeria").forEach((galeria) => {
	galeria.addEventListener("click", (event) => {
		const botaoFoto = event.target.closest(".resultado-foto");
		const imagem = botaoFoto?.querySelector("img");

		if (!imagem || !visualizadorImagem || !imagemAmpliada) return;

		botaoFotoAtivador = botaoFoto;
		rolagemAntesDaFoto = window.scrollY;
		imagemAmpliada.src = imagem.currentSrc || imagem.src;
		imagemAmpliada.alt = imagem.alt;
		visualizadorImagem.showModal();
	});
});

visualizadorImagem?.querySelector(".visualizador-fechar")?.addEventListener("click", () => {
	visualizadorImagem.close();
});

visualizadorImagem?.addEventListener("keydown", (event) => {
	if (event.key === "Escape") visualizadorImagem.close();
});

visualizadorImagem?.addEventListener("click", (event) => {
	if (event.target === visualizadorImagem) visualizadorImagem.close();
});

visualizadorImagem?.addEventListener("close", () => {
	if (!botaoFotoAtivador) return;

	const botaoFoto = botaoFotoAtivador;
	const rolagem = rolagemAntesDaFoto;
	requestAnimationFrame(() => {
		botaoFoto.focus({ preventScroll: true });
		window.scrollTo({ top: rolagem, behavior: "instant" });
	});
});
