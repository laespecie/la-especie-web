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
                        text: "Este lunes 3 de agosto, la Cámara de Diputados de Chile debatirá dos proyectos contrapuestos que definirán el futuro de las carreras de perros en el país: el fin definitivo de esta práctica bajo sanciones penales o su legalización regulada en canódromos. Desde la perspectiva científica y del bienestar animal, los expertos advierten sobre las secuelas físicas, el dopaje sistemático y el impacto ecológico de una actividad que divide al campo y moviliza a la ciudadanía.",
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
                        text: "Por Redacción La Especie  |  Publicado: 29 de Julio de 2026",
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
                        text: "Por un lado, los defensores de la actividad argumentan que las carreras constituyen una tradición rural arraigada y una fuente de identidad comunitaria en diversos sectores agrícolas del país, asegurando que una regulación estricta con controles veterinarios bastaría para mitigar cualquier riesgo. Por otro lado, las agrupaciones animalistas y la comunidad científica veterinaria sostienen que las carreras de galgos son intrínsecamente crueles e incompatibles con el concepto moderno de bienestar animal, puesto que reducen a seres sintientes a meras herramientas de apuestas y lucro informal.",
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
                        text: ", roturas musculares graves y tendinitis crónicas reportadas recurrentemente en clínicas veterinarias de zonas rurales. Además, la fatiga extrema provocada por estas carreras puede desencadenar cuadros de acidosis láctica severa e hipertermia por esfuerzo, que en muchos casos resultan fatales si no se cuenta con atención médica de emergencia inmediata.",
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
                        text: "Para lograr que el animal corra más rápido o tolere el cansancio, se ha constatado el uso de anabólicos esteroides, estimulantes del sistema nervioso como la cafeína y la efedrina, broncodilatadores y estimulantes cardíacos. Lo más alarmante es el uso de analgésicos y antiinflamatorios potentes cuyo fin no es sanar una lesión, sino enmascarar el dolor físico para obligar al perro a seguir corriendo. Este enmascaramiento anula el mecanismo natural de defensa del animal, provocando que continúe el esfuerzo físico sobre una lesión preexistente, lo que a menudo termina en fracturas óseas catastróficas en plena carrera.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // VETERINARY OPINION SECTION (With editorial note to replace)
            new Paragraph({
                text: "Espacio para Inserción: Opinión Profesional Veterinaria",
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 180, after: 120 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "NOTA EDITORIAL PARA BORIS: Puedes reemplazar la siguiente cita de borrador con la declaración de tu fuente veterinaria directa cuando la obtengas.",
                        bold: true,
                        color: "006D77",
                        size: 20
                    })
                ],
                spacing: { after: 120 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "«Las secuelas fisiológicas y emocionales de las carreras en los galgos son devastadoras. No existe una 'regulación' posible para una actividad cuyo núcleo es la sobreexplotación de la capacidad de resistencia del animal. El confinamiento prolongado, la sobrecarga física extrema y el uso sistemático de fármacos estimulantes vulneran directamente los pilares más básicos del bienestar animal consagrados por la ciencia», explica un especialista en medicina veterinaria y comportamiento animal consultado por La Especie.",
                        italic: true,
                        size: 22,
                        color: "0F172A"
                    })
                ],
                spacing: { left: 400, right: 400, before: 120, after: 300 }
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
                        text: "El proyecto de prohibición que se discutirá este lunes busca reformar la Ley N° 20.380 sobre Protección de Animales para vetar explícitamente las carreras de perros de cualquier raza en todo el país, castigando a los organizadores con penas de presidio menor en su grado mínimo (61 a 540 días) y multas que van desde las 2 hasta las 30 UTM, además del decomiso de los animales. Por el contrario, la moción reguladora pretende legalizar la actividad bajo la creación de canódromos autorizados por el Servicio Agrícola y Ganadero (SAG), estableciendo pruebas de dopaje y control veterinario obligatorio.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Sin embargo, para las ONGs de bienestar animal, regular una actividad basada en el lucro y la explotación de la velocidad de un animal es una contradicción ética insalvable. «No se puede regular el abuso. Países como Argentina y Uruguay ya dieron el paso histórico de prohibir las carreras por ley debido a la imposibilidad de controlar la crueldad clandestina que rodea a este negocio», señalan los activistas de Galgo Libre. La votación de este lunes definirá si Chile avanza hacia el fin de una práctica cuestionada por la ciencia o si opta por un polémico marco regulatorio que prolongará la discusión por años.",
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
                    new TextRun({ text: "1. Abordaje del Dilema Ético y Científico:\n", bold: true, size: 24 }),
                    new TextRun({ text: "La prensa generalista suele tratar las carreras de perros como un simple conflicto de opiniones entre «tradición rural» y «modernidad urbana». En La Especie elevamos la discusión incorporando la fisiología veterinaria del galgo, explicando por qué las fuerzas biomecánicas y la velocidad extrema provocan fracturas y lesiones sistemáticas, y detallando los efectos destructivos del dopaje químico ilegal en su organismo.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "2. Conexión con el Daño Ecológico:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Ampliamos el enfoque tradicional del bienestar individual del perro al impacto ecológico general. Explicamos cómo el descarte de galgos hacia la caza no regulada actúa como un factor de depredación letal sobre especies nativas chilenas vulnerables (como el pudú, el coipo y el zorro chilla), conectando la problemática animal con la conservación de la biodiversidad local.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "3. Estructura para Inserción Profesional de la Fuente:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Diseñamos un bloque específico de «Opinión Veterinaria» precedido por una nota editorial clara, permitiendo que Boris o su equipo puedan reemplazar el borrador de forma sencilla por la declaración de su fuente directa sin que se rompa el hilo conductor de la redacción.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "4. Desmantelamiento de la Viabilidad de la Regulación:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Analizamos críticamente la propuesta de «regulación» confrontándola con el marco legal internacional (mencionando las prohibiciones en Argentina y Uruguay), argumentando desde la ciencia del bienestar animal por qué la regulación de la explotación deportiva y económica de cánidos suele ser una justificación inviable frente al maltrato intrínseco.", size: 24 })
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
