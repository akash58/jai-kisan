const Menu = [
  {
    title: 'Home',
    group: 'apps',
    icon: 'home',
    name: 'Home',
    href: '/'
  },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
    href: '/dashboard'
  },
  {
    title: 'Farmers',
    group: 'apps',
    icon: 'chat_bubble',
    name: 'Farmers'
  },
  {
    title: 'Equipment Finance',
    group: 'components',
    component: 'components',
    icon: 'tune',
    items: [
      {name: 'Equipment Inquires', title: 'Equipment Inquires', href: '/'},
      {name: 'LMS', title: 'LMS', href: '/'},
      {name: 'Stores', title: 'Stores', href: '/'},
      {name: 'Vendors', title: 'Vendors', href: '/'},
      {name: 'Products', title: 'Products', href: '/'},
      {name: 'Orders', title: 'Orders', href: '/'},
    ]
  }
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
