# Yet another typwrite script.

A lightweight, recursive typewriter effect that preserves HTML formatting (like `<h1>`, `<b>`, and `<a>` tags) and supports multi-message cycling directly from your HTML.

## Whats cool?
* **HTML Aware**: Types inside nested tags without breaking your layout.
* **Easy Cycling**: Cycle through multiple messages using a hidden source div.
* **Fully Customizable**: Control speed, delays, and looping via HTML attributes.
* **Zero Dependencies**: Pure Vanilla JavaScript.

---

## How to use?

1. Copy `index.js` to your project folder or use it from my own page ``` https://lynnyc.net/typewriter.js ```
2. Link it at the bottom of your HTML file:
   ```html
   <script src="index.js"></script>
   ```
   or
   ```html
   <script src="https://lynnyc.net/typewriter.js"></script>
   ```

---

## How to Use part 2 >.<

### 1. The Display Box
Place this `div` wherever you want the typewriter text to appear. 

```html
<div class="textbox" 
     tspeed="40" 
     tdelay="1000" 
     tloop="true" 
     tloopspeed="20" 
     tloopdelay="3000">
</div>
```

### 2. The Message Source
Create a hidden `div` with the ID `typewriter-source`. Each `div` inside it represents one "slide" in the cycle.

```html
<div id="typewriter-source" style="display:none;">
  <div><h1>Hello!</h1>Welcome to my website.</div>
  <div><h1>I'm a Developer.</h1>I love building clean UI.</div>
  <div><b>Check out</b> my latest projects below.</div>
</div>
```

---

## ⚙️ Configuration (Attributes)

You can customize the behavior by changing the attributes on the `.textbox` element:

| Attribute | Description | Default |
| :--- | :--- | :--- |
| `tspeed` | Typing speed (ms per character). | `50` |
| `tdelay` | Initial pause before typing starts (ms). | `1000` |
| `tloop` | Whether to delete and cycle to the next message (`true`/`false`). | `false` |
| `tloopspeed` | Speed of the backspace/deletion (ms per character). | `50` |
| `tloopdelay` | How long to stay on a finished message before deleting (ms). | `1000` |

---

## 🎨 Recommended CSS
To ensure the text wraps correctly and doesn't "flash" before the script loads, add this to your stylesheet:

```css
.textbox {
  white-space: pre-wrap; /* Required for line breaks */
  opacity: 0;            /* Keeps box hidden until tdelay is over */
  transition: opacity 0.5s ease;
}

/* Optional: Center the text */
.textbox {
  text-align: center;
}
```

---
## Themeing

You can theme this project by putting a div around the textbox div and telling that where to go.

---

## Contributing
Feel free to fork this project and submit pull requests for any features you'd like to add!
