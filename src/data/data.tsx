import {
  AcademicCapIcon,
  CalendarIcon,
  DownloadIcon,
  FlagIcon,
  MapIcon,
  OfficeBuildingIcon,
  SparklesIcon,
} from '@heroicons/react/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import heroImage from '../images/header-background.webp';
import porfolioAsignacionTFG from '../images/portfolio/portfolio-AsignacionTFG.png';
import portfolioFindACoach from '../images/portfolio/portfolio-FindACoach.jpg';
import porfolioMonopoly from '../images/portfolio/portfolio-Monopoly.png';
import porfolioMultinucleo from '../images/portfolio/portfolio-Multinucleo.png';
import porfolioRedAmbulatorios from '../images/portfolio/portfolio-RedAmbulatorios.png';
import porfolioSeriesFormatter from '../images/portfolio/portfolio-SeriesFormatter.jpg';
import porfolioTFG from '../images/portfolio/portfolio-TFG.jpg';
import porfolioWatchIt from '../images/portfolio/portfolio-WatchIt.png';
import porfolioWhatsappClone from '../images/portfolio/portfolio-WhatsappClone.png';
import porfolioWhatsappCounter from '../images/portfolio/portfolio-WhatsappCounter.jpg';
import profilepic from '../images/profilepic.jpg';
import resumeBahia from '../images/resume/resume-Bahia.jpg';
import resumeCambridge from '../images/resume/resume-Cambridge.jpg';
import resumeDGT from '../images/resume/resume-DGT.jpg';
import resumeOllosGrandes from '../images/resume/resume-OllosGrandes.png';
import resumeScrumManager from '../images/resume/resume-ScrumManager.jpg';
import resumeUdemy from '../images/resume/resume-Udemy.png';
import resumeUSC from '../images/resume/resume-USC.jpg';
import resumeVexiza from '../images/resume/resume-Vexiza.jpg';
import resumeXunta from '../images/resume/resume-Xunta.png';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Pablo Tarrío Otero',
  description: 'Página realizada con el fin de tener mi CV actualizado en todo momento.',
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'About',
  Contact: 'Contacto',
  Portfolio: 'Portfolio',
  Resume: 'Resumen',
  Skills: 'Habilidades',
  Stats: 'Estadísticas',
} as const;

export type SectionId = typeof SectionId[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `Pablo Tarrío Otero`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Soy Pablo, graduado en <strong className="text-stone-100">Ingeniería Informática</strong> y actualmente
        trabajando en <strong className="text-stone-100">Vexiza S.L.</strong> colaborando en el desarrollo de
        aplicaciones para la gestión del medio rural en Galicia.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        En mi tiempo libre me gusta <strong className="text-stone-100">socializar</strong>, ver{' '}
        <strong className="text-stone-100">baloncesto</strong> y <strong className="text-stone-100">F1</strong>,
        escuchar <strong className="text-stone-100">música</strong>, <strong className="text-stone-100">viajar</strong>{' '}
        y hacer <strong className="text-stone-100">deporte</strong>.
      </p>
    </>
  ),
  actions: [
    {
      href: 'https://drive.google.com/file/d/1EB5ckJPDxgfvezd9VlQV2sAzvD3p-Igj/view?usp=drivesdk',
      text: 'Descargar CV',
      primary: true,
      Icon: DownloadIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contactar',
      primary: false,
    },
  ],
};

function getEdad(dateString: string) {
  let hoy = new Date();
  let fechaNacimiento = new Date(dateString);
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
  if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad.valueOf();
}

let edad = String(getEdad('2000/12/27 00:00:00'));

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: `Ingeniero informático especialmente interesado en tecnologías web como React.js y Spring Boot. En mi tiempo libre me gusta socializar, ver deporte, viajar, escuchar música y jugar a videojuegos.`,
  aboutItems: [
    {label: 'Localización', text: 'Santiago de Compostela, España', Icon: MapIcon},
    {label: 'Edad', text: edad, Icon: CalendarIcon},
    {label: 'Nacionalidad', text: 'Española', Icon: FlagIcon},
    {label: 'Intereses', text: 'Automovilismo, baloncesto, videojuegos...', Icon: SparklesIcon},
    {label: 'Educación', text: 'Universidade de Santiago de Compostela', Icon: AcademicCapIcon},
    {label: 'Empleo', text: 'Analista/Programador en Vexiza S.L.', Icon: OfficeBuildingIcon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Idiomas hablados',
    skills: [
      {
        name: 'Español',
        level: 10,
      },
      {
        name: 'Gallego',
        level: 10,
      },
      {
        name: 'Inglés',
        level: 8,
      },
      {
        name: 'Portugués',
        level: 6,
      },
      {
        name: 'Alemán',
        level: 3,
      },
    ],
  },
  {
    name: 'Desarrollo de Frontend',
    skills: [
      {
        name: 'JavaScript / jQuery',
        level: 10,
      },
      {
        name: 'React',
        level: 9,
      },
      {
        name: 'Vue',
        level: 9,
      },
      {
        name: 'HTML5 / CSS3 / Tailwind',
        level: 9,
      },
      {
        name: 'TypeScript',
        level: 7,
      },
    ],
  },
  {
    name: 'Desarrollo de Backend',
    skills: [
      {
        name: 'Spring Framework',
        level: 10,
      },
      {
        name: 'Hibernate',
        level: 10,
      },
      {
        name: 'REST API',
        level: 10,
      },
    ],
  },
  {
    name: 'Bases de datos',
    skills: [
      {
        name: 'OracleSQL',
        level: 10,
      },
      {
        name: 'PostgreSQL',
        level: 10,
      },
      {
        name: 'MongoDB',
        level: 10,
      },
      {
        name: 'MySQL',
        level: 9,
      },
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Clon de WhatsApp',
    description:
      'El proyecto es un clon de la aplicación de WhatsApp web. Esta página utiliza ReactJS como framework principal. El proyecto se ha construido utilizando ReactJs, React Context API y React Router. También he utilizado TailwindCSS para estilizar el proyecto, y FontAwesome para los iconos. El proyecto se encuentra alojado en Vercel. implementado con React.js y Tailwind CSS.',
    url: 'https://pablito2199-whatsapp.vercel.app/',
    image: porfolioWhatsappClone,
  },
  {
    title: 'Herramienta para la creación y edición colaborativa de documentos, TFG',
    description:
      'Herramienta colaborativa para la creación y edición de documentos por parte de usuarios expertos en legislación a nivel gallego. Se trata de mi TFG, dirigido por personal del CiTIUS, donde se han utilizado tecnologías como React.js, Tailwind, Spring Boot, MongoDB, ...',
    url: 'https://github.com/pablito2199/TFG',
    image: porfolioTFG,
  },
  {
    title: 'Watch.it',
    description:
      'Red social temática elaborada durante las clases de Ingeniería de Servicios en la universidad. Se pueden crear usuarios y respectivas amistades, así como películas y valoraciones de estas.',
    url: 'https://github.com/pablito2199/Watch.it',
    image: porfolioWatchIt,
  },
  {
    title: 'Find a coach',
    description:
      'Aplicación que permite el registro/inicio de sesión de usuarios, registrar entrenadores, filtrar entrenadores, enviar solicitudes de contacto y ver solicitudes de contacto personales. Se ha realizado con Vue 3 y Vuex, utilizando Firebase como base de datos y autenticación.',
    url: 'https://pablito2199-find-a-coach.vercel.app/',
    image: portfolioFindACoach,
  },
  {
    title: 'Gestión de una red de ambulatorios',
    description:
      'Aplicación de gestión de una base de datos de un ambulatorio para la asignatura de BDII del GrEI de la USC.',
    url: 'https://github.com/pablito2199/BDII-Ambulatorioe',
    image: porfolioRedAmbulatorios,
  },
  {
    title: 'Programación multinúcleo SIMD',
    description:
      'Programación multinúcleo, y mediante instrucciones en OpenMP y AVX, para realizar operaciones entre cuaterniones. Proyecto de la asignatura de Arquitectura de Computadores.',
    url: 'https://github.com/pablito2199/Programacion-Multinucleo-SIMD',
    image: porfolioMultinucleo,
  },
  {
    title: 'Asignación de TFGs en CLIPS',
    description: 'Este proyecto permite la asignación de TFGs a los alumnos a partir de sus propuestas solicitadas.',
    url: 'https://github.com/pablito2199/Asignacion-de-TFGs-en-CLIPS',
    image: porfolioAsignacionTFG,
  },
  {
    title: 'Monopoly',
    description:
      'Monopoly realizado mediante Programación Orientada a Objetos en la asignatura de Programación Orientada a Objetos.',
    url: 'https://github.com/pablito2199/Monopoly',
    image: porfolioMonopoly,
  },
  {
    title: 'Whatsapp Message Counter',
    description:
      'Este script te permite saber el número de mensajes enviados por los miembros de un chat. Solo tienes que exportar la conversación a un archivo en formato .txt y ejecutar el script.',
    url: 'https://github.com/pablito2199/WhatsApp-Message-Counter',
    image: porfolioWhatsappCounter,
  },
  {
    title: "Series' Formatter",
    description:
      'Formatea el nombre de tus series en según el orden y la temporada. Solamente has de ordenador los archivos en tu carpeta y ejecutar el script.',
    url: 'https://github.com/pablito2199/Series-Formatter',
    image: porfolioSeriesFormatter,
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const experience: TimelineItem[] = [
  {
    date: 'Octubre 2022 - Presente',
    time: '',
    location: 'Vexiza S.L.',
    title: 'Líder técnico - Analista/Programador',
    content: (
      <div>
        <p>
          En mi etapa como desarrollador Junior y FullStack participé en el desarrollo de TERREC, una aplicación
          destinada a la AMTEGA para la gestión del parcelario a nivel gallego. El objetivo ha sido unificar en una
          misma aplicación la gestión de aldeas modelo, polígonos agroforestales, investigaciones de titularidad, etc.
          La gestión de estas incluye la visión y modificación en mapa mediante capas y servicios GIS.
        </p>
        <br />
        <p>
          En cuanto a tecnologías, se ha utilizado SpringBoot con una base de datos OracleSQL en el backend, y
          jQuery/JavaScript para el frontend, utilizando ArcGis para el control de GIS. Además, se han realizado
          despliegues de forma autónoma en Jenkins y se ha trabajado con JUnit para realizar tests. Con respecto a
          control de versiones, se ha utilizado SVN.
        </p>
        <br />
        <p>
          En esta aplicación también se han realizado integraciones con otras APIs, como las de Catastro, ARPAD,
          Notifica.gal, PortaSinaturas o Sede electrónica de la Xunta.
        </p>
        <br />
        <p>
          Una vez accedo al puesto de líder técnico me encargo de la dirección desde la parte técnica de dos proyectos:
          TERREC y XALEA, un proyecto heredado debido a haber ganado una licitación. Este último se encarga de gestionar
          el reparto de ayudas LEADER en los Grupos de Desarrollo Rural junto con Agader. Además de todos los puntos que
          he tocado en la aplicación de TERREC, destaco la evolución en este proyecto de cara al uso de buenas
          prácticas, análisis de riesgos, gestión de tareas dentro del equipo y las múltiples reuniones establecidas con
          el cliente con el fin de obtención de datos para el desarrollo de la aplicación.
        </p>
      </div>
    ),
    image: resumeVexiza,
    credencial: '',
    url: 'https://www.vexiza.com/',
  },
  {
    date: 'Julio 2021 - Agosto 2021',
    time: '(2 meses)',
    location: 'Bahía Software',
    title: 'Desarrollador de Backend - en prácticas',
    content: (
      <div>
        <p>
          El proyecto en el que se ha colaborado recibe el nombre de INQUI, un proyecto encargado de la monitorización
          de los procesos informáticos (tales como el HIS – Sistema de Información Hospitalario, LIS – Sistema de
          Información de Laboratorio, etc.) de los hospitales de Quirón Salud.
        </p>
        <br />
        <p>
          De esta forma, me he podido familiarizar con el entorno Mirth Connect y la mensajería HL7 en un entorno de
          tipo sanitario. Las labores realizadas han sido en backend, gestionando también una base de datos de tipo
          MySQL. En cuanto a ingeniería de software, se ha utilizado una metodología Agile y Scrum.
        </p>
      </div>
    ),
    image: resumeBahia,
    credencial: '',
    url: 'https://bahiasoftware.es/home',
  },
];

export const education: TimelineItem[] = [
  {
    date: 'Septiembre 2018 - Septiembre 2022',
    time: '',
    location: 'Universidade de Santiago de Compostela',
    title: 'Grado en Ingeniería Informática',
    content: (
      <div className="ml-4">
        Durante esta estancia universitaria me he formado en campos muy diversos, entre los que destacan:
        <ul className="ml-4">
          <li>• Programación (Java, C, Python)</li>
          <li>
            • Gestión de bases de datos (SQL, MongoDB) y sincronización de estas con aplicaciones y páginas web (JDBC).
          </li>
          <li>• Ingeniería de servicios (Spring Boot)</li>
          <li>• Ingeniería web (HTML5, CSS3, JavaScript, jQuery, Servlets, React.js)</li>
          <li>
            • Interacción persona-ordenador (usabilidad de aplicaciones y facilidad de uso de estas para los usuarios)
          </li>
          <li>
            • Matemáticas: álgebra linear, cálculo numérico (SageMath), matemática discreta, lógica y estadística (R)
          </li>
          <li>• Administración y gestión de sistemas y redes (C y Shell)</li>
          <li>• Ingeniería de computadores</li>
          <li>• Ingeniería del software</li>
          <li>• Sistemas de información</li>
          <li>• Sistemas inteligentes</li>
          <li>• Sistemas basados en reglas (CLIPS, PROLOG)</li>
          <li>• Organización y gestión empresarial</li>
          <li>• Computación gráfica (C, C++)</li>
          <li>• Computación en la nube (AWS Educate)</li>
        </ul>
      </div>
    ),
    image: resumeUSC,
    credencial: '',
    url: 'https://www.usc.gal/es/estudios/grados/ingenieria-arquitectura/grado-ingenieria-informatica-2aedicion',
  },
  {
    date: 'Septiembre 2016 - Mayo 2018',
    time: '',
    location: 'I.E.S. Nosa Señora dos Ollos Grandes',
    title: 'Bachillerato de Ciencias Tecnológicas',
    content: <p></p>,
    image: resumeOllosGrandes,
    credencial: '',
    url: 'http://www.edu.xunta.gal/centros/iesollosgrandes/',
  },
];

export const certificaciones: TimelineItem[] = [
  {
    date: 'Expedición abr. 2025',
    time: '16h',
    location: 'Scrum Manager',
    title: 'Scrum Master Certified',
    content: <p></p>,
    image: resumeScrumManager,
    credencial: '52008',
    url: 'https://scrummanager.com/website/c/verify-cert.php?code=67ff71804d53a6.40019203',
  },
  {
    date: 'Expedición oct. 2019 · Vencimiento: oct. 2029',
    time: '',
    location: 'Dirección General de Tráfico',
    title: 'Permiso de Conducir (Clase B)',
    content: <p></p>,
    image: resumeDGT,
    credencial: '',
    url: 'https://sede.dgt.gob.es/es/permisos-de-conducir/obtencion-renovacion-duplicados-permiso/permiso-conducir/examen-maniobras/permiso-b.shtml',
  },
  {
    date: 'Expedición: jul. 2017 · Sin fecha de vencimiento',
    time: '',
    location: 'Cambridge University Press & Assessment English',
    title: 'B2 First Certificate in English (FCE)',
    content: <p></p>,
    image: resumeCambridge,
    credencial: '',
    url: 'https://www.cambridgeenglish.org/es/exams-and-tests/first/',
  },
  {
    date: 'Expedición: dic. 2014 · Sin fecha de vencimiento',
    time: '',
    location: 'Cambridge University Press & Assessment English',
    title: 'B1 Preliminary (PET)',
    content: <p></p>,
    image: resumeCambridge,
    credencial: '',
    url: 'https://www.cambridgeenglish.org/es/exams-and-tests/preliminary/',
  },
  {
    date: 'Expedición: jun. 2018 · Sin fecha de vencimiento',
    time: '',
    location: 'Xunta de Galicia',
    title: 'CELGA 4',
    content: <p></p>,
    image: resumeXunta,
    credencial: '',
    url: 'https://www.lingua.gal/o-galego/aprendelo/celga-4/validacion',
  },
];

export const cursos: TimelineItem[] = [
  {
    date: '2023',
    time: '(32 horas)',
    location: 'Udemy',
    title: 'Vue - The Complete Guide (incl. Router & Composition API)',
    content: <p></p>,
    image: resumeUdemy,
    credencial: 'UC-4a97ea3d-fba4-4621-b4ae-e33b3cfff9c2',
    url: 'https://www.udemy.com/certificate/UC-4a97ea3d-fba4-4621-b4ae-e33b3cfff9c2/',
  },
  {
    date: '2023',
    time: '(13.5 horas)',
    location: 'Udemy',
    title: 'Curso Completo de Bases de datos MongoDB y NoSQL',
    content: <p></p>,
    image: resumeUdemy,
    credencial: 'UC-d9cc0c28-13a1-4e1d-aa80-69b180dec946',
    url: 'https://www.udemy.com/certificate/UC-d9cc0c28-13a1-4e1d-aa80-69b180dec946/',
  },
  {
    date: '2018',
    time: '(31 horas), Nota: 9.7/10',
    location: 'Universidade de Santiago de Compostela',
    title: 'Curso de Competencias en Información (Básico)',
    content: <p></p>,
    image: resumeUSC,
    credencial: 'BUSC.1819.41',
    url: 'https://rebusca.usc.gal/guia-curso-competencias-basico/informacion',
  },
];

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Contacta conmigo.',
  description: 'Este es mi medio de contacto. Cualquier consulta agradecería que me contactases a mi email.',
  items: [
    {
      type: ContactType.Email,
      text: 'pablotarriootero@gmail.com',
      href: 'mailto:pablotarriootero@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Santiago de Compostela, España',
      href: 'https://www.google.es/maps/place/Lugo/@43.0123137,-7.5740097,14z/data=!3m1!4b1!4m5!3m4!1s0xd31ce80b130876d:0x1f305fbf2867050c!8m2!3d43.0097384!4d-7.5567582',
    },
    {
      type: ContactType.Instagram,
      text: '@pablito_tarrio',
      href: 'https://www.instagram.com/pablito_tarrio',
    },
    {
      type: ContactType.Github,
      text: 'pablito2199',
      href: 'https://github.com/pablito2199',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/pablito2199'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/pablo-tarr%C3%ADo-otero-806b52204/'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/pablito_tarrio'},
];
