async function startTypewriter() {
  const box = document.querySelector('.textbox');
  const source = document.querySelector('#tsource');
  
  if (!box || !source) return;

  // 1. Fetch settings from HTML attributes
  const speed = parseInt(box.getAttribute('tspeed')) || 50;
  const initialDelay = parseInt(box.getAttribute('tdelay')) || 1000;
  const shouldLoop = box.getAttribute('tloop') === "true";
  const deleteSpeed = parseInt(box.getAttribute('tloopspeed')) || 50;
  const loopDelay = parseInt(box.getAttribute('tloopdelay')) || 1000;
  
  // 2. Extract messages from the hidden source div
  const messages = Array.from(source.children).map(div => div.innerHTML);
  
  box.style.opacity = "0";
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function performEffect() {
    await sleep(initialDelay);
    box.style.opacity = "1";
    
    let currentMsgIndex = 0;

    while (true) {
      // PHASE 1: TYPE OUT
      box.innerHTML = "";
      const tempDiv = document.createElement('div');
      // Grab the current message in the cycle
      tempDiv.innerHTML = messages[currentMsgIndex];
      await typeRecursive(tempDiv, box, "add");

      if (!shouldLoop && currentMsgIndex === messages.length - 1) break;

      // PHASE 2: WAIT BEFORE DELETE
      await sleep(loopDelay);

      // PHASE 3: DELETE
      await typeRecursive(box, box, "remove");
      
      // PHASE 4: UPDATE INDEX FOR NEXT CYCLE
      currentMsgIndex = (currentMsgIndex + 1) % messages.length;

      await sleep(500); 
    }
  }

  async function typeRecursive(node, target, mode) {
    const children = Array.from(node.childNodes);
    if (mode === "remove") children.reverse();

    for (const child of children) {
      if (child.nodeType === Node.TEXT_NODE) {
        if (mode === "add") {
          for (const char of child.textContent) {
            target.append(char);
            if (char !== '\n') await sleep(speed);
          }
        } else {
          while (child.textContent.length > 0) {
            child.textContent = child.textContent.slice(0, -1);
            await sleep(deleteSpeed);
          }
        }
      } else {
        if (mode === "add") {
          const tagClone = child.cloneNode(false);
          target.appendChild(tagClone);
          await typeRecursive(child, tagClone, "add");
        } else {
          await typeRecursive(child, child, "remove");
          child.remove();
        }
      }
    }
  }

  performEffect();
}

window.onload = startTypewriter;