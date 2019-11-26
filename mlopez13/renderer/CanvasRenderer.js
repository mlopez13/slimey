
class CanvasRenderer {
	
	constructor(w, h) {
		const canvas = document.createElement("canvas");
		canvas.style = "position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; border: solid black";
		this.w = canvas.width = w;
		this.h = canvas.height = h;
		this.view = canvas;
		this.ctx = canvas.getContext("2d");
		this.ctx.textBaseline = "top";
	}
	
	render(container, clear = true) {
		const {ctx} = this;
		
		// RENDER RECURSIVE internal function.
		
		function renderRec(container) {
			container.children.forEach(child => {
				
				// (0) Check if visible.
				if (child.visible == false) {
					return;
				}
				
				// (1) Draw child.
				ctx.save();
				if (child.pos) {
					ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
				}
				if (child.anchor) {
					ctx.translate(child.anchor.x, child.anchor.y);
				}
				if (child.scale) {
					ctx.scale(child.scale.x, child.scale.y);
				}
				if (child.rotation) {
					const px = child.pivot ? child.pivot.x : 0;
					const py = child.pivot ? child.pivot.y : 0;
					ctx.translate(px, py);
					ctx.rotate(child.rotation);
					ctx.translate(-px, -py);
				}
				
				// TEXT.
				if (child.text) {
					
					if (child.shadowStyle) {
						const {font, fill, align} = child.shadowStyle;
						if (font) ctx.font = font;
						if (fill) ctx.fillStyle = fill;
						if (align) ctx.textAlign = align;
						ctx.fillText(child.text, 0, 0);
					}
					
					const {font, fill, align} = child.style;
					if (font) ctx.font = font;
					if (fill) ctx.fillStyle = fill;
					if (align) ctx.textAlign = align;
					ctx.fillText(child.text, 0, 0);
					
				}
				
				// TEXTURE.
				else if (child.texture) {
					const img = child.texture.img;
					if (child.tileW) {
						ctx.drawImage(
							img,
							child.frame.x*child.tileW, // Source x.
							child.frame.y*child.tileH, // Source y.
							child.tileW, child.tileH, // Width and height.
							0, 0, // Destination x and y.
							child.tileW, child.tileH // Destination w and h.
						);
					} else {
						ctx.drawImage(img, 0, 0);
					}
				}
				
				// (2) Apply renderRec if child has children.
				if (child.children) {
					renderRec(child);
				}
				ctx.restore();
				
			});
		}
		
		if (clear) {
			ctx.clearRect(0, 0, this.w, this.h);
		}
		
		// Start render recursive over all children in container.
		renderRec(container);
	}
}

export default CanvasRenderer;
