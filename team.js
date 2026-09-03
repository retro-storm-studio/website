const TEAM_MEMBERS = [
  {
    name: 'Lorenzo',
    role: '2D Artist',
    photo: 'imgs/team/01.webp',
    bio: 'Does stuff to the game and is Italian.',
    favGames: 'Games Lorenzo likes.',
    links: [
      { label: 'Bluesky', icon: 'imgs/icons/bluesky.svg', url: 'https://bsky.app' },
    ],
  },
  {
    name: 'Martin R.',
    role: 'Game Designer',
    photo: 'imgs/team_pics/martin_profile_pic.jpg',
    bio: 'Tries to find the fun.',
    favGames: 'One. More. Turn.',
    links: [
      { label: 'Portfolio', icon: 'imgs/icons/skeleton.webp', url: 'https://jmartinrh.github.io/web_portfolio/' }
    ],
  },
  {
    name: 'Mohazza',
    role: 'Dev/3D Artist',
    photo: 'imgs/team_pics/mohazza_profile_pic.jpeg',
    bio: 'Making games, chasing dreams, and sailing toward the One Piece.',
    favGames: 'Monster Hunter, Crash Bandicoot, Cuphead, Hollow Knight, Brawlhalla.',
    links: [
      { label: 'Portfolio', icon: 'imgs/icons/skeleton.webp', url: 'https://mohazza00.github.io/' },
      { label: 'GitHub', icon: 'imgs/icons/github.svg', url: '      https://github.com/mohazza00' }
    ],
  },
  {
    name: 'Ty Radman',
    role: 'Dev/Tech Artist',
    photo: 'imgs/team/04.webp',
    bio: "When it's time to touch grass, I like to boulder and hike.",//Not sure if it's worth being too technical here :/ "I design Tank Lore's systems and enemy AI, and often find my self adding whatever tools and tech art the game needs. If an enemy felt too unfair or too easy, I am the one to blame.\n" + 
    favGames: 'Dark Souls, Warcraft 3, Advance Wars, Hollow Knight, the Silent Hills.',
    links: [
      { label: 'Portfolio', icon: 'imgs/icons/skeleton.webp', url: 'https://tyradman.github.io/static-portfolio' },
      { label: 'GitHub', icon: 'imgs/icons/github.svg', url: 'https://github.com/TyRadman' },
      { label: 'LinkedIn', icon: 'imgs/icons/linkedin.svg', url: 'https://www.linkedin.com/in/tyradman/' },
    ],
  },
];

function createTeamLink(link, memberName) {
  const anchor = document.createElement('a');
  anchor.href = link.url;
  anchor.target = '_blank';
  anchor.rel = 'noopener';
  anchor.title = link.label;
  anchor.setAttribute('aria-label', link.label + ' \u2014 ' + memberName);

  const icon = document.createElement('img');
  icon.src = link.icon;
  icon.alt = '';
  icon.loading = 'lazy';
  anchor.appendChild(icon);

  return anchor;
}

function createTeamCard(member) {
  const card = document.createElement('article');
  card.className = 'member';
  card.setAttribute('data-reveal', '');

  const photo = document.createElement('img');
  photo.src = member.photo;
  photo.alt = '';
  photo.loading = 'lazy';
  card.appendChild(photo);

  const name = document.createElement('h3');
  name.textContent = member.name;
  card.appendChild(name);

  const role = document.createElement('p');
  role.className = 'role';
  role.textContent = member.role;
  card.appendChild(role);

  if (member.links && member.links.length) {
    const linkRow = document.createElement('div');
    linkRow.className = 'member-links';
    member.links.forEach((link) => {
      linkRow.appendChild(createTeamLink(link, member.name));
    });
    card.appendChild(linkRow);
  }

  const bio = document.createElement('p');
  bio.className = 'bio';
  bio.textContent = member.bio;
  card.appendChild(bio);

  if (member.favGames) {
    const favHeading = document.createElement('p');
    favHeading.className = 'fav-games';
    const strong = document.createElement('strong');
    strong.textContent = 'Favorite Games:';
    favHeading.appendChild(strong);
    card.appendChild(favHeading);

    const favList = document.createElement('p');
    favList.className = 'bio';
    favList.textContent = member.favGames;
    card.appendChild(favList);
  }

  return card;
}

function renderTeam(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const fragment = document.createDocumentFragment();
  TEAM_MEMBERS.forEach((member) => fragment.appendChild(createTeamCard(member)));

  mount.innerHTML = '';
  mount.appendChild(fragment);
}