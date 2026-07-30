const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, ExternalHyperlink, AlignmentType } = require('docx');

const outputDir = 'C:/Users/boris/OneDrive/Escritorio/La Especie';

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read the greyhound image to embed
const imagePath = path.join(__dirname, 'images', 'uploads', 'galgo-triste.jpg');
let imageRun;

try {
    const imageBuffer = fs.readFileSync(imagePath);
    imageRun = new ImageRun({
        data: imageBuffer,
        transformation: {
            width: 550,
            height: 310,
        },
        type: 'jpg'
    });
} catch (err) {
    console.error("Could not load image to embed in docx:", err);
}

// ----------------------------------------------------
// GENERATE THE DOCX DOCUMENT
// ----------------------------------------------------
const doc = new Document({
    sections: [{
        properties: {},
        children: [
            // HEADER / BADGE
            new Paragraph({
                children: [
                    new TextRun({
                        text: "LA ESPECIE | SECCIÓN BIENESTAR & LEGISLACIÓN",
                        bold: true,
                        color: "6D28D9", // Deep purple accent
                        size: 20, // 10pt
                        font: "Arial"
                    })
                ],
                spacing: { after: 120 }
            }),

            // MAIN TITLE
            new Paragraph({
                text: "¿Regulación o prohibición?: El dilema ético y científico de las carreras de galgos llega al Congreso",
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 200 }
            }),

            // SUBTITLE / BAJADA
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Este lunes 3 de agosto, la Cámara de Diputados de Chile debatirá dos proyectos contrapuestos que definirán el futuro de las carreras de perros en el país: el fin definitivo de esta práctica bajo sanciones penales o su legalización regulada en canódromos. Con el aporte científico y ético de la medicina veterinaria, los expertos advierten sobre las secuelas físicas, la manipulación química mediante dopaje y el impacto ecológico de una actividad que divide al campo y moviliza a la ciudadanía.",
                        italic: true,
                        size: 24, // 12pt
                        color: "475569"
                    })
                ],
                spacing: { after: 300 }
            }),

            // EMBEDDED IMAGE (if loaded successfully)
            ...(imageRun ? [
                new Paragraph({
                    children: [imageRun],
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 120, after: 120 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Un galgo inglés (Greyhound) confinado en un canil de entrenamiento. Foto: La Especie",
                            italic: true,
                            size: 18,
                            color: "64748B"
                        })
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 300 }
                })
            ] : []),

            // DIVIDER LINE / BYLINE
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Por Redacción La Especie  |  Publicado: 30 de Julio de 2026",
                        bold: true,
                        size: 18,
                        color: "64748B"
                    })
                ],
                spacing: { after: 360 }
            }),

            // BODY PARAGRAPHS
            new Paragraph({
                children: [
                    new TextRun({
                        text: "El próximo lunes 3 de agosto, la Sala de la Cámara de Diputadas y Diputados de Chile se convertirá en el epicentro de una discusión que trasciende lo legislativo para entrar de lleno en el debate moral y científico sobre nuestra relación con los animales. Los parlamentarios deberán votar dos mociones cruzadas sobre las carreras de perros: una iniciativa que busca su prohibición absoluta y sanción penal, y otra que propone un marco regulatorio para permitir su funcionamiento legal mediante «canódromos» autorizados. La sesión reactiva una discusión altamente polarizada que en agosto de 2024 vio el rechazo de un proyecto de prohibición similar por estrecho margen, desatando la indignación de organizaciones de protección animal como ",
                        size: 24
                    }),
                    new ExternalHyperlink({
                        children: [
                            new TextRun({
                                text: "Fundación Galgos Chile",
                                color: "0563C1",
                                underline: true,
                                size: 24
                            })
                        ],
                        link: "https://www.fundaciongalgos.cl"
                    }),
                    new TextRun({
                        text: " y la coordinadora internacional ",
                        size: 24
                    }),
                    new ExternalHyperlink({
                        children: [
                            new TextRun({
                                text: "Galgo Libre",
                                color: "0563C1",
                                underline: true,
                                size: 24
                            })
                        ],
                        link: "https://www.galgolibre.org"
                    }),
                    new TextRun({
                        text: ". La ciudadanía y las agrupaciones civiles siguen con atención un hito que marcará un antes y un después en la legislación de bienestar animal chilena.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "La discusión reactiva la tensión entre quienes defienden la práctica como una tradición de campo y quienes la catalogan como explotación. Frente a esta visión instrumental, la ",
                        size: 24
                    }),
                    new TextRun({
                        text: "Dra. Javiera Rojas Burgos, médica veterinaria de la Universidad Mayor",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ", recuerda la naturaleza del vínculo que une a ambas especies: ",
                        size: 24
                    }),
                    new TextRun({
                        text: "«Los perros son una especie que ha evolucionado durante miles de años al lado del ser humano, su biología ya no se constituye en lo salvaje sino que en la simbiosis interespecie, han desarrollado mecanismos sociales de interdependencia, debemos hacernos responsables de eso»",
                        italic: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ".",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // SECTION HEADING
            new Paragraph({
                text: "La fisiología del galgo: Un atleta al límite de la fractura",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Desde el punto de vista de la medicina veterinaria, la anatomía del galgo inglés (Greyhound) es un prodigio de la selección genética: poseen un corazón proporcionalmente más grande que el de otros cánidos, un alto volumen de glóbulos rojos para optimizar la oxigenación y una musculatura predominantemente de contracción rápida. Sin embargo, esta especialización física extrema los hace altamente vulnerables cuando son forzados a competir en pistas comerciales.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Las fuerzas biomecánicas a las que se somete el esqueleto de un galgo durante una carrera son extremas. Al correr a velocidades de hasta 70 km/h en pistas curvas y estrechas, el miembro anterior izquierdo (en pistas con giro antihorario) recibe una sobrecarga de presión equivalente a varias veces el peso del cuerpo del animal. Esto explica la alta prevalencia de ",
                        size: 24
                    }),
                    new TextRun({
                        text: "fracturas por estrés en los huesos del carpo y tarso",
                        bold: true,
                        color: "B91C1C",
                        size: 24
                    }),
                    new TextRun({
                        text: ", roturas musculares graves y tendinitis crónicas reportadas recurrentemente en clínicas veterinarias. Además, la fatiga extrema provocada por estas carreras puede desencadenar cuadros de acidosis láctica severa e hipertermia por esfuerzo, que en muchos casos resultan fatales si no se cuenta con atención médica de emergencia inmediata.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Al respecto, la Dra. Rojas Burgos sostiene de forma tajante que la naturaleza de la actividad atenta contra la integridad misma de los canes: ",
                        size: 24
                    }),
                    new TextRun({
                        text: "«Las carreras de perros, independientemente de la raza, no constituyen un deporte regulable sino una sobreexplotación fisiológica que falta a la ética. Por lo que no solo nos referimos a una corrida sana, hablamos de exposición severa a factores de riesgo que el animal no es capaz de manejar»",
                        italic: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ".",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // SECTION HEADING 2
            new Paragraph({
                text: "El doping: El oscuro secreto químico de las pistas",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Uno de los argumentos científicos más contundentes a favor de la prohibición es el uso generalizado de sustancias farmacológicas para alterar artificialmente el rendimiento de los animales. Al tratarse de una actividad que funciona principalmente de manera informal y clandestina, la administración de sustancias dopantes se realiza sin supervisión profesional, poniendo en riesgo vital a los perros.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Para lograr que el animal corra más rápido o tolere el cansancio, se ha constatado el uso de anabólicos esteroides, estimulantes del sistema nervioso como la cafeína y la efedrina, broncodilatadores y estimulantes cardíacos. Lo más alarmante es el uso de analgésicos y antiinflamatorios potentes cuyo fin no es sanar una lesión, sino enmascarar el dolor físico para obligar al perro a seguir corriendo. Este enmascaramiento anula el mecanismo de defensa natural del dolor, provocando que continúe el esfuerzo físico sobre una lesión preexistente, lo que a menudo termina en fracturas óseas catastróficas en plena carrera.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Como explica la especialista de la Universidad Mayor, esta manipulación química anula las respuestas biológicas de supervivencia: ",
                        size: 24
                    }),
                    new TextRun({
                        text: "«Es conocido que para lograr una mayor eficiencia se utiliza la administración de fármacos moduladores de la nocicepción (dolor) disminuyendo las respuestas naturales de protección que tenemos los mamíferos: alejarnos de la fuente de riesgo, cambiar el movimiento, detenernos, etc. Por lo que no solo nos referimos a una corrida sana, hablamos de exposición severa a factores de riesgo que el animal no es capaz de manejar»",
                        italic: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ".",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // SECTION HEADING 3
            new Paragraph({
                text: "El descarte y el impacto ecológico colateral",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "La crueldad de la industria de las carreras no termina en la meta. Los galgos son considerados productivos únicamente en un estrecho rango que va desde los 18 meses hasta los 3 o 4 años de edad. Una vez que su velocidad decrece debido a la edad, lesiones o desgaste de articulaciones, el destino de miles de estos animales es el abandono o la eutanasia informal.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Frente a esta dura realidad de descarte, la Dra. Rojas Burgos denuncia la falta de empatía humana detrás de este negocio: ",
                        size: 24
                    }),
                    new TextRun({
                        text: "«Conocemos el rol que realizan fundaciones o personas naturales por rescatar, rehabilitar y sostener galgos que son abandonados por ya no servir para correr por envejecer, presentar fracturas u otras enfermedades, no hay humanidad en abandonar, en no hacerse cargo de quien te generó dinero, ego y estatus. No se puede llamar deporte ni cultura si hay sufrimiento de por medio»",
                        italic: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ".",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Además de la crisis de protección animal que esto representa, las carreras de galgos tienen un impacto ecológico directo y perjudicial para los ecosistemas locales chilenos. En el ámbito rural, los ejemplares que ya no son aptos para las pistas son vendidos o entregados a cazadores de liebres. La caza con galgos (comúnmente no regulada) genera un grave desequilibrio en la fauna silvestre nativa de Chile. Estos canes, adiestrados para perseguir presas a alta velocidad, persiguen e introducen una presión de depredación extrema sobre especies nativas vulnerables como el ",
                        size: 24
                    }),
                    new TextRun({
                        text: "pudú (Pudu puda), el coipo (Myocastor coypus) y el zorro chilla (Lycalopex griseus)",
                        bold: true,
                        color: "006D77",
                        size: 24
                    }),
                    new TextRun({
                        text: ", además de diversas aves terrestres que anidan en el suelo. El descarte de la industria de las carreras se convierte así en un vector de daño ecológico para la biodiversidad de los campos de Chile.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // SECTION HEADING 4
            new Paragraph({
                text: "El debate legislativo: ¿Es posible regular el maltrato?",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "El proyecto de prohibición que se discutirá este lunes busca reformar la Ley N° 20.380 sobre Protección de Animales para vetar explícitamente las carreras de perros de cualquier raza en todo el país, castigando a los organizadores con penas de presidio menor en su grado mínimo (61 a 540 días) y multas que van desde las 2 hasta las 30 UTM, además del de comiso de los animales. Por el contrario, la moción reguladora pretende legalizar la actividad bajo la creación de canódromos autorizados por el Servicio Agrícola y Ganadero (SAG), estableciendo pruebas de dopaje y control veterinario obligatorio.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "La discusión sobre una posible regulación es mirada con absoluto escepticismo desde el gremio médico y científico. La Dra. Rojas Burgos advierte sobre la ineficacia del sistema de control y la falta de voluntad en el resguardo ético: ",
                        size: 24
                    }),
                    new TextRun({
                        text: "«Hablamos también de un sistema gubernamental que ha demostrado ineficiencia para fiscalizar algo tan extendido territorialmente como lo es la aplicación de la ley de tenencia responsable 21.020, ¿realmente la regulación es la vía adecuada si tenemos evidencia del fracaso legislativo frente a otras temáticas animales? ¿Realmente habrá recursos destinados para ello? No toda regulación es la vía para mantener el control, muchas veces falta tener determinación frente a conceptos humanos como lo son la ética y la moral»",
                        italic: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ".",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Finalmente, la académica apoya la prohibición absoluta basándose en los modelos contemporáneos de bienestar animal de la ciencia veterinaria: ",
                        size: 24
                    }),
                    new TextRun({
                        text: "«Bajo el modelo científico de los cinco dominios del Bienestar Animal, que conlleva incontables estudios de comportamiento, esta práctica vulnera de forma sostenida la salud física, el entorno ambiental y el estado mental del animal. Por tanto, pretender regular el maltrato sistemático es técnicamente inviable; la única postura científicamente ética y basada en la evidencia es la prohibición absoluta»",
                        italic: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ". La votación de este lunes definirá si Chile avanza hacia el fin de una práctica cuestionada por la ciencia o si opta por un polémico marco regulatorio que prolongará el sufrimiento de miles de animales.",
                        size: 24
                    })
                ],
                spacing: { after: 280 }
            }),

            // SECTION 2: EXPLANATION OF EDITORIAL DECISIONS
            new Paragraph({
                text: "_________________________________________________________________________________",
                spacing: { after: 300 }
            }),

            new Paragraph({
                text: "EXPLICACIÓN EDITORIAL: ¿CÓMO Y POR QUÉ SE REDACTÓ ASÍ ESTA NOTICIA?",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Para estructurar la cobertura periodística de ",
                        size: 24
                    }),
                    new TextRun({
                        text: "La Especie",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: " sobre el inminente debate parlamentario de las carreras de galgos, se aplicaron los siguientes criterios profesionales:",
                        size: 24
                    })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "1. Integración Temática de la Vocería Experta:\n", bold: true, size: 24 }),
                    new TextRun({ text: "En lugar de agrupar toda la declaración de la veterinaria Javiera Rojas Burgos en una única 'caja de citas', distribuimos fragmentos de su testimonio a lo largo de las distintas secciones del artículo. Esto enriquece la narrativa y respalda con argumentos de la academia (Universidad Mayor) cada uno de los aspectos clave abordados: la fisiología del perro, el doping, el descarte ético y la inviabilidad práctica de la regulación.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "2. Rigor Científico y Bienestar Animal:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Incorporamos términos y modelos científicos provistos por la experta, como el «modelo de los cinco dominios del Bienestar Animal» y el impacto de los «fármacos moduladores de la nocicepción» (dopaje para anular el dolor). Esto fundamenta de manera contundente la postura de que las carreras representan una sobreexplotación biológica y no un deporte.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "3. Crítica a la Eficiencia de la Regulación:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Utilizamos la analogía planteada por la especialista sobre la ineficiencia histórica del Estado al fiscalizar la Ley N° 21.020 (Ley Cholito) para cuestionar la viabilidad real de regular canódromos, enriqueciendo la discusión política del proyecto con evidencia pragmática y de gestión.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "4. Enlace del Bienestar Animal con la Conservación:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Mantuvimos el enfoque de protección de ecosistemas de La Especie al detallar cómo los perros desechados de las carreras dañan la fauna nativa (pudú, coipo y zorro chilla) al ser usados para la caza no regulada, expandiendo la relevancia de la prohibición de las carreras a la biodiversidad nacional.", size: 24 })
                ],
                spacing: { after: 200 }
            })
        ]
    }]
});

// Write the Word document
Packer.toBuffer(doc).then((buffer) => {
    const filePath = path.join(outputDir, "Debate_carreras_de_galgos_Chile_prohibicion_versus_regulacion.docx");
    fs.writeFileSync(filePath, buffer);
    console.log("Word document written successfully to:", filePath);
}).catch(err => {
    console.error("Error creating docx:", err);
});
