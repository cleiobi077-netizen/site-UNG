/* Données issues du site officiel www.ung.ga et de la charte graphique UNG.
   Pour mettre à jour le site, il suffit de modifier ce fichier. */
window.UNG = {
  /* Photos du bandeau d'accueil (découpées dans les barres du logo) */
  heroSlides: [
    { img: "img/photos/semaine-numerique-groupe.webp", pos: "50% 45%", caption: "Semaine du Numérique, 1ʳᵉ édition · 26-30 octobre 2026" },
    { img: "img/photos/sneg-2026-salle.webp", pos: "50% 40%", caption: "SNEG 2026 : l'UNG au rendez-vous" },
    { img: "img/photos/semaine-numerique-stand.webp", pos: "50% 45%", caption: "Le stand de l'UNG à la Semaine du Numérique" },
    { img: "img/photos/etudiants-eno-salle.webp", pos: "50% 45%", caption: "Les étudiants de l'UNG réunis en Espace Numérique Ouvert" },
    { img: "img/photos/cooperation-reunion.webp", pos: "50% 45%", caption: "Réunion de coopération universitaire" },
    { img: "img/photos/eno-classe-hybride.webp", pos: "62% 50%", caption: "Formation en techno-pédagogie, ENO de l'INSG · mai 2025" },
    { img: "img/photos/agregation-cames.webp", pos: "62% 40%", caption: "22ᵉ concours d'agrégation SJPEG du CAMES · Libreville" },
    { img: "img/photos/sport-trophee.webp", pos: "45% 25%", caption: "L'équipe féminine de football de l'UNG, victorieuse" },
    { img: "img/photos/uvci-delegation.webp", pos: "55% 38%", caption: "Délégation UNG à l'Université Virtuelle de Côte d'Ivoire" },
    { img: "img/photos/inauguration-eno.webp", pos: "55% 40%", caption: "Inauguration d'un Espace Numérique Ouvert · juin 2025" }
  ],

  /* Couleurs des pôles = couleurs d'accompagnement de la charte graphique */
  poles: {
    MPI:  { name: "Mathématiques, Physique, Informatique", color: "#161A31", img: "img/photos/pole-mpi.webp",
            pitch: "Le pôle de l'IA, de la donnée et de la cybersécurité. Il prépare aux masters scientifiques et aux écoles d'ingénieurs." },
    STI:  { name: "Sciences et Techniques de l'Ingénieur", color: "#1F6F63", img: "img/photos/pole-sti.webp",
            pitch: "Fibre optique, informatique industrielle, applications mobiles et systèmes d'information de santé." },
    SEDG: { name: "Économie, Gestion et Droit", color: "#B8401A", img: "img/photos/agregation-cames.webp",
            pitch: "Juristes du numérique, eBanking, finance et marketing digital, gestion de la paie." },
    SHS:  { name: "Sciences Humaines et Sociales", color: "#B33D5E", img: "img/photos/sport-trophee.webp",
            pitch: "Patrimoine, traduction et interprétation, langues appliquées et management du sport." },
    SVT:  { name: "Sciences de la Vie et de la Terre", color: "#462812", img: "",
            pitch: "E-agriculture, industrie du bois, économie de l'environnement et biologie marine." },
    FC:   { name: "Formation continue certifiante", color: "#322e1a", img: "img/photos/eno-poste.webp",
            pitch: "Des certifications courtes pour les professionnels en activité." }
  },

  programs: [
    { pole: "MPI", level: "Licence", title: "Licence Informatique", ai: true,
      desc: "Socle en informatique avec spécialisation dès la licence.",
      specs: ["Intelligence artificielle", "Cybersécurité", "Big Data", "Data analyse", "DevOps", "Ingénierie des données"],
      jobs: ["Data scientist", "Développeur IA", "Spécialiste cybersécurité", "Ingénieur cloud / DevOps", "Administrateur systèmes et réseaux"] },
    { pole: "MPI", level: "Licence", title: "Licence Mathématiques et Physique",
      desc: "Pour les masters scientifiques ou les écoles d'ingénieurs.",
      specs: ["Modélisation mathématique", "Mathématiques appliquées", "Physique appliquée", "Physique fondamentale"],
      jobs: ["Statisticien", "Data analyst", "Modélisateur mathématique", "Technicien en instrumentation", "Enseignant en sciences"] },
    { pole: "MPI", level: "Master", title: "Master Intelligence Artificielle", ai: true,
      desc: "Machine learning, deep learning et conduite de projets IA.",
      jobs: ["Ingénieur IA", "Développeur machine learning", "Expert deep learning", "Chef de projet IA", "Chercheur en intelligence artificielle"] },
    { pole: "MPI", level: "Master", title: "Master Big Data", ai: true,
      desc: "Architecture et exploitation des données massives.",
      jobs: ["Data scientist", "Architecte Big Data", "Analyste Big Data", "Chief Data Officer", "Consultant en transformation data"] },
    { pole: "MPI", level: "Master", title: "Master Ingénierie des Données", ai: true,
      desc: "Les pipelines et bases de données qui alimentent l'IA.",
      jobs: ["Data engineer", "Architecte de données", "Ingénieur ETL", "Administrateur de bases de données"] },
    { pole: "MPI", level: "Master", title: "Master Data Analyse", ai: true,
      desc: "Transformer les données en décisions.",
      jobs: ["Data analyst", "Analyste décisionnel", "Consultant data"] },
    { pole: "MPI", level: "Master", title: "Master Cybersécurité",
      desc: "Protéger les systèmes d'information publics et privés.",
      jobs: ["Expert en sécurité informatique", "Pentester / ethical hacker", "Responsable sécurité des SI", "Analyste en cybersécurité"] },
    { pole: "MPI", level: "Master", title: "Master DevOps",
      desc: "Automatisation, cloud et fiabilité des plateformes.",
      jobs: ["Ingénieur DevOps", "Architecte cloud", "Site Reliability Engineer", "Expert CI/CD"] },

    { pole: "STI", level: "Licence", title: "Licence pro Métiers du Numérique et de l'Industrie",
      desc: "Communication digitale, fibre optique, informatique industrielle.",
      specs: ["Systèmes d'information de santé", "Fibre optique", "Applications mobiles", "Maintenance industrielle", "Génie thermique et énergétique"],
      jobs: ["Technicien fibre optique", "Développeur d'applications mobiles", "Technicien de maintenance industrielle", "Gestionnaire de SI de santé"] },

    { pole: "SEDG", level: "Licence", title: "Licence Économie", desc: "Parcours économie numérique.",
      specs: ["Économie numérique"], jobs: ["Économiste du numérique", "Chargé d'études économiques"] },
    { pole: "SEDG", level: "Licence", title: "Licence Droit", desc: "Former les juristes du numérique.",
      specs: ["Juriste numérique"], jobs: ["Juriste numérique", "Juriste spécialisé", "Assistant juridique"] },
    { pole: "SEDG", level: "Licence", title: "Licence Gestion", desc: "Finance, eBanking et marketing à l'ère digitale.",
      specs: ["Finance digitale", "Marketing digital"], jobs: ["Chargé de marketing digital", "Gestionnaire eBanking", "Assistant paie et relations du travail"] },

    { pole: "SHS", level: "Licence", title: "Licence pro Langues Étrangères Appliquées", desc: "Langues et commerce international.",
      jobs: ["Agent commercial bilingue", "Chargé d'affaires bilingue", "Chef de projet digital bilingue", "Chargé de communication à l'international"] },
    { pole: "SHS", level: "Licence", title: "Licence Anthropologie du Patrimoine", desc: "Valoriser et conserver le patrimoine culturel.",
      jobs: ["Médiateur culturel", "Archiviste", "Conservateur de patrimoine", "Guide interprète", "Scénographe"] },
    { pole: "SHS", level: "Licence", title: "Licence Traduction et Interprétation", desc: "Traduction, sous-titrage, localisation, conférences.",
      jobs: ["Traducteur", "Interprète de conférence", "Localisateur", "Rédacteur de contenu", "Sous-titreur"] },
    { pole: "SHS", level: "Licence", title: "Licence Management des Organisations Sportives", desc: "Clubs, événements et structures sportives.",
      jobs: ["Manager de club professionnel", "Concepteur d'événements sportifs", "Gestionnaire d'équipements sportifs", "Attaché de presse sport"] },
    { pole: "SHS", level: "Master", title: "Master Management des Organisations Sportives", desc: "Formation continue, avec le Comité National Olympique du Gabon.",
      jobs: ["Directeur d'organisation sportive", "Conseiller en politiques sportives", "Responsable partenariats"] },
    { pole: "SHS", level: "Executive", title: "Executive Master Directeurs Techniques Nationaux", desc: "Pour les cadres des fédérations sportives.",
      jobs: ["Directeur technique national", "Cadre fédéral"] },

    { pole: "SVT", level: "Licence", title: "Licence pro Agro-foresterie", desc: "E-agriculture, bois et développement durable.",
      specs: ["Commerce agricole et forestier", "Transformation alimentaire", "Conservation et développement durable", "Monitoring environnemental"],
      jobs: ["Technicien environnement", "Agent de gestion forestière", "Entrepreneur agro-forestier", "Responsable production agroalimentaire"] },
    { pole: "SVT", level: "Master", title: "Master Agroalimentaire", desc: "Sécurité alimentaire et nutritionnelle (SAN).",
      jobs: ["Responsable qualité agroalimentaire", "Ingénieur en sécurité alimentaire", "Consultant en nutrition et santé"] },
    { pole: "SVT", level: "Master", title: "Master Écologie et Biologie Marine", desc: "Gestion des écosystèmes aquatiques (GEA).",
      jobs: ["Gestionnaire d'aires marines protégées", "Expert en écosystèmes aquatiques", "Chercheur en écologie marine", "Consultant en biodiversité marine"] },

    { pole: "FC", level: "Certification", title: "Développement Mobile", desc: "Certification professionnelle.", jobs: ["Développeur mobile"] },
    { pole: "FC", level: "Certification", title: "Communication Digitale", desc: "Certification professionnelle.", jobs: ["Chargé de communication digitale"] },
    { pole: "FC", level: "Certification", title: "Stratégie Digitale", desc: "Certification professionnelle.", jobs: ["Responsable stratégie digitale"] },
    { pole: "FC", level: "Certification", title: "Réseaux Sociaux", desc: "Certification professionnelle.", jobs: ["Community manager"] },
    { pole: "FC", level: "Certification", title: "Infographie", desc: "Certification professionnelle.", jobs: ["Infographiste"] },
    { pole: "FC", level: "Certification", title: "Multimédia", desc: "Certification professionnelle.", jobs: ["Technicien multimédia"] },
    { pole: "FC", level: "Certification", title: "HTML", desc: "Certification professionnelle.", jobs: ["Intégrateur web"] },
    { pole: "FC", level: "Certification", title: "Ingénierie Numérique en Éducation et Formation", desc: "Certification professionnelle.", jobs: ["Ingénieur pédagogique", "Concepteur e-learning"] }
  ],

  /* Mots-clés pour le moteur « Que voulez-vous devenir ? » */
  synonyms: {
    "ia": "intelligence artificielle machine learning deep learning", "intelligence": "ia", "data": "donnees data", "donnee": "data",
    "informatique": "developpeur data cybersecurite devops", "code": "developpeur", "programmer": "developpeur", "dev": "developpeur",
    "hacker": "cybersecurite pentester securite", "securite": "cybersecurite", "cloud": "devops cloud",
    "avocat": "juriste droit", "loi": "droit juriste", "banque": "ebanking finance", "argent": "finance", "commerce": "commercial marketing",
    "marketing": "marketing digital", "pub": "communication marketing", "reseaux": "reseaux sociaux community", "instagram": "reseaux sociaux community",
    "langue": "traduction langues bilingue", "anglais": "bilingue langues traduction", "traduire": "traduction traducteur",
    "musee": "patrimoine conservateur", "culture": "patrimoine culturel", "foot": "sport", "football": "sport", "sportif": "sport",
    "nature": "environnement agro forestier", "foret": "forestier gestion forestiere", "agriculture": "agro agricole", "mer": "marine aquatiques", "ocean": "marine",
    "sante": "sante nutrition", "enseigner": "enseignant pedagogique", "prof": "enseignant pedagogique", "design": "infographie infographiste multimedia",
    "telephone": "mobile", "appli": "mobile applications", "fibre": "fibre optique", "electricite": "maintenance industrielle thermique energetique"
  },

  aiTracks: [
    { code: "L3", title: "Licence Informatique, spécialité IA", text: "Spécialisation dès la licence : IA, big data, data analyse, ingénierie des données, cybersécurité ou DevOps." },
    { code: "M2", title: "Master Intelligence Artificielle", text: "Machine learning, deep learning et conduite de projets IA." },
    { code: "M2", title: "Big Data · Ingénierie · Data Analyse", text: "Collecter, structurer et valoriser les données, le carburant de l'IA." },
    { code: "M2", title: "Cybersécurité · DevOps", text: "Sécuriser et opérer les infrastructures qui font tourner l'IA." }
  ],

  eno: [
    { id: "INSG", host: "Institut National des Sciences de Gestion", note: "Lieu de la formation en techno-pédagogie du personnel (mai 2025)." },
    { id: "USS", host: "Université des Sciences de la Santé", note: "Un ENO au plus près des futurs professionnels de santé." },
    { id: "UOB", host: "Université Omar Bongo", note: "Au cœur de la première université du pays." },
    { id: "ENS", host: "École Normale Supérieure", note: "Pour les futurs enseignants et la pédagogie numérique." },
    { id: "ENSET", host: "École Normale Supérieure de l'Enseignement Technique", note: "Au service des filières techniques et industrielles." },
    { id: "CFEP-TIC", host: "Centre CFEP-TIC", note: "Le centre partenaire dédié aux métiers des TIC." }
  ],

  /* Clips animés réalisés à partir des photos publiées par l'UNG (Facebook) */
  reels: [
    { video: "img/videos/reel-semaine-numerique.mp4", poster: "img/videos/reel-semaine-numerique.webp", title: "Semaine du Numérique", sub: "1ʳᵉ édition · octobre 2026" },
    { video: "img/videos/reel-sneg-2026.mp4", poster: "img/videos/reel-sneg-2026.webp", title: "SNEG 2026", sub: "L'UNG au rendez-vous" },
    { video: "img/videos/reel-etudiants-eno.mp4", poster: "img/videos/reel-etudiants-eno.webp", title: "Nos étudiants", sub: "En Espace Numérique Ouvert" }
  ],

  /* Vidéos officielles publiées sur la page Facebook de l'UNG (lecture via le lecteur Facebook, au clic) */
  fbVideos: [
    { id: "4146238822325754", type: "reel", poster: "img/videos/poster-v6.webp", title: "Rejoins la grande famille de l'UNG", dur: "0:21" },
    { id: "4435073673429127", type: "reel", poster: "img/videos/poster-v0.webp", title: "Salon National de l'Orientation, 3ᵉ édition", dur: "1:04" },
    { id: "3238017883029691", type: "reel", poster: "img/videos/poster-v5.webp", title: "L'UNG et le CAMES", dur: "2:09" },
    { id: "1316544773823723", type: "reel", poster: "img/videos/poster-v1.webp", title: "Entretien avec la direction académique", dur: "2:04" },
    { id: "1147251810878583", type: "reel", poster: "img/videos/poster-v4.webp", title: "L'UNG et l'UNESCO", dur: "3:34" }
  ],

  news: [
    { tag: "Numérique", title: "Semaine du Numérique : l'UNG au rendez-vous national", date: "26-30 octobre 2026", img: "img/photos/semaine-numerique-groupe.webp", url: "https://www.facebook.com/profile.php?id=61566344891963",
      text: "1ʳᵉ édition placée sous le signe de la souveraineté, de l'inclusion et de l'innovation : l'équipe et les étudiants de l'UNG ont tenu stand et présenté l'enseignement à distance." },
    { tag: "Événement", title: "SNEG 2026 : l'UNG au rendez-vous", date: "2026", img: "img/photos/sneg-2026-officiels.webp", url: "https://www.facebook.com/profile.php?id=61566344891963" },
    { tag: "Événement", title: "L'UNG accueille le 22ᵉ concours d'agrégation SJPEG du CAMES", date: "Octobre 2025", img: "img/photos/agregation-cames.webp", url: "https://www.ung.ga/actualite/92" },
    { tag: "Campus", title: "Le ministre de l'Enseignement supérieur inaugure un Espace Numérique Ouvert", date: "25 juin 2025", img: "img/photos/inauguration-eno.webp", url: "https://www.ung.ga/actualite/91" },
    { tag: "Pédagogie", title: "Formation en techno-pédagogie pour le personnel, à l'ENO de l'INSG", date: "21 mai 2025", img: "img/photos/eno-classe-hybride.webp", url: "https://www.ung.ga/actualite.php?id=89" },
    { tag: "Partenariat", title: "L'UNG et l'UVCI unissent leurs forces pour l'enseignement à distance", date: "Avril 2025", img: "img/photos/uvci-delegation.webp", url: "https://www.ung.ga/actualite.php?id=88" },
  ],

  partners: [
    { name: "UCAD", full: "Université Cheikh Anta Diop de Dakar", what: "Validation de maquettes, formations communes, mobilité", logo: "img/logos/part4.webp", url: "https://www.ucad.sn/" },
    { name: "UN-CHK", full: "Université numérique Cheikh Hamidou Kane", what: "Appui à l'installation, réseautage, certification", logo: "img/logos/part2.webp", url: "https://www.unchk.sn/" },
    { name: "UVCI", full: "Université Virtuelle de Côte d'Ivoire", what: "Appui à l'installation, enseignants disponibles", logo: "img/logos/part3.webp", url: "https://uvci.online/portail/Main/index/fr" },
    { name: "UNESCO", full: "Bureau de Libreville", what: "Ressources pédagogiques libres", logo: "img/logos/unesco.webp", url: "https://www.unesco.org/fr/fieldoffice/libreville/gsagabon" },
    { name: "CNOG", full: "Comité National Olympique du Gabon", what: "Masters et licences du management du sport", logo: "img/logos/part6.webp", url: "https://www.facebook.com/p/Comit%C3%A9-National-Olympique-du-Gabon" },
    { name: "Laboratoire de langues", full: "Laboratoire de Langues de Libreville", what: "Installation, réseautage, enseignants", logo: "img/logos/part5.webp", url: "https://www.facebook.com/p/Laboratoire-de-Langues-de-Lbv" },
    { name: "CFEP-TIC", full: "Centre de formation aux métiers des TIC", what: "Espace Numérique Ouvert partenaire", logo: "img/logos/part1.webp" }
  ]
};
