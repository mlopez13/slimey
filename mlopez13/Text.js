
class Text {
	constructor(text = "", style = {}, shadowStyle) {
		this.pos = {x: 0, y: 0};
		this.text = text;
		this.style = style;
		this.shadowStyle = shadowStyle;
	}
}

export default Text;
