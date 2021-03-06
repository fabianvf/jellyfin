define(["css!./emby-radio", "registerElement"], function() {
    "use strict";

    function onKeyDown(e) {
        if (13 === e.keyCode) return e.preventDefault(), this.checked = !0, !1
    }
    var EmbyRadioPrototype = Object.create(HTMLInputElement.prototype);
    EmbyRadioPrototype.attachedCallback = function() {
        if ("true" !== this.getAttribute("data-radio")) {
            this.setAttribute("data-radio", "true"), this.classList.add("mdl-radio__button");
            var labelElement = this.parentNode;
            labelElement.classList.add("mdl-radio"), labelElement.classList.add("mdl-js-radio"), labelElement.classList.add("mdl-js-ripple-effect");
            var labelTextElement = labelElement.querySelector("span");
            labelTextElement.classList.add("radioButtonLabel"), labelTextElement.classList.add("mdl-radio__label"), labelElement.insertAdjacentHTML("beforeend", '<span class="mdl-radio__outer-circle"></span><span class="mdl-radio__inner-circle"></span>'), this.addEventListener("keydown", onKeyDown)
        }
    }, document.registerElement("emby-radio", {
        prototype: EmbyRadioPrototype,
        extends: "input"
    })
});