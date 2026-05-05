let accordionCount = 0;

export default function decorate(block) {
  accordionCount += 1;
  const accordionId = `accordion-${accordionCount}`;

  const rows = [...block.children].filter((row) => row.children.length >= 2);
  const accordion = document.createElement('div');
  accordion.className = 'accordion-items';

  rows.forEach((row, index) => {
    const [titleCell, contentCell] = [...row.children];
    const item = document.createElement('div');
    item.className = 'accordion-item';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'accordion-trigger';
    trigger.id = `${accordionId}-button-${index + 1}`;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', `${accordionId}-panel-${index + 1}`);
    trigger.innerHTML = titleCell.innerHTML || 'Accordion item';

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.id = `${accordionId}-panel-${index + 1}`;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', trigger.id);
    panel.hidden = true;

    while (contentCell.firstChild) {
      panel.appendChild(contentCell.firstChild);
    }

    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      item.classList.toggle('accordion-item-open', !expanded);
    });

    item.append(trigger, panel);
    accordion.append(item);
  });

  if (!accordion.children.length) {
    return;
  }

  block.replaceChildren(accordion);
}
