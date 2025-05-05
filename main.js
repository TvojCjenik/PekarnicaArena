// Load static site data (title, logo, favicon, header)
function loadSiteData() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Basic site data
      document.title = data.title;
      document.getElementById('page-title').textContent = data.title;
      document.getElementById('favicon').href = data.favicon;
      document.getElementById('logo').src = data.logo;
      document.getElementById('header-text').textContent = data.headerText;

      // Set CSS variables for colors
      const root = document.documentElement;
      const colors = data.colors;
      if (colors) {
        if (colors.headerColor) root.style.setProperty('--header-color', colors.headerColor);
        if (colors.boxColor) root.style.setProperty('--box-color', colors.boxColor);
        if (colors.textColor) root.style.setProperty('--text-color', colors.textColor);
        if (colors.backgroundColor) root.style.setProperty('--background-color', colors.backgroundColor);
        if (colors.itemColor) root.style.setProperty('--item-color', colors.itemColor);
        if (colors.hoverColor) root.style.setProperty('--hover-color', colors.hoverColor);
      }
    })
    .catch(error => {
      console.error('Error loading site data:', error);
    });
}
  
  // Load menu data and render
  async function loadMenu() {
    try {
      const response = await fetch('assets/menu.json');
      const menu = await response.json();
  
      const categories = {};
      const categoryOrder = [];
  
      // Dynamically build categories based on first appearance
      menu.forEach(item => {
        if (!categories[item.category]) {
          categories[item.category] = [];
          categoryOrder.push(item.category); // preserve order
        }
        categories[item.category].push(item);
      });
  
      const menuContainer = document.getElementById('menu');
  
      for (const category of categoryOrder) {
        const items = categories[category];
        const section = document.createElement('section');
        section.classList.add('menu-category', 'expanded');
  
        const heading = document.createElement('h2');
        heading.textContent = formatCategoryName(category);
        heading.classList.add('category-heading');
  
        const arrow = document.createElement('span');
        arrow.classList.add('arrow');
        arrow.innerHTML = '&#x25B2;';
        heading.appendChild(arrow);
  
        heading.addEventListener('click', () => {
          toggleCategory(section, arrow);
        });
  
        section.appendChild(heading);
  
        const list = document.createElement('ul');
        list.className = 'menu-list expanded';
  
        items.forEach((item, index) => {
          const listItem = document.createElement('li');
  
          const nameSpan = document.createElement('span');
          nameSpan.textContent = item.name;
  
          const priceSpan = document.createElement('span');
          priceSpan.textContent = `€${item.price.toFixed(2)}`;
  
          listItem.appendChild(nameSpan);
          listItem.appendChild(priceSpan);
          listItem.style.animationDelay = `${index * 0.1}s`;
  
          list.appendChild(listItem);
        });
  
        section.appendChild(list);
        menuContainer.appendChild(section);
      }
  
    } catch (error) {
      console.error('Failed to load menu:', error);
    }
  }
  
  function formatCategoryName(category) {
    if (category === "topli") return "Topli napitci ☕";
    if (category === "bezalkoholna") return "Bezalkoholna pića 🥤";
    if (category === "pivo") return "Pivo 🍺";
    if (category === "vino") return "Vino 🍷";
    if (category === "zestoko") return "Žestoka pića 🥃";
    if (category === "koktel") return "Kokteli 🍸";
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
  
  function toggleCategory(section, arrow) {
    const list = section.querySelector('.menu-list');
    section.classList.toggle('expanded');
    list.classList.toggle('expanded');
    arrow.innerHTML = list.classList.contains('expanded') ? '&#x25B2;' : '&#x25BC;';
  }
  
  // Run everything
  loadSiteData();
  loadMenu();
  