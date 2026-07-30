const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, ExternalHyperlink, AlignmentType } = require('docx');

const outputDir = 'C:/Users/boris/OneDrive/Escritorio/La Especie';

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read the hake image to embed
const imagePath = path.join(__dirname, 'images', 'uploads', 'merluza-austral.jpg');
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
                        text: "LA ESPECIE | SECCIÓN ECOSISTEMAS & CONSERVACIÓN",
                        bold: true,
                        color: "006D77", // Marine teal accent
                        size: 20, // 10pt
                        font: "Arial"
                    })
                ],
                spacing: { after: 120 }
            }),

            // MAIN TITLE
            new Paragraph({
                text: "El grito silencioso de la merluza austral: una veda biológica que llega tarde para una especie exhausta y sintiente",
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 200 }
            }),

            // SUBTITLE / BAJADA
            new Paragraph({
                children: [
                    new TextRun({
                        text: "El anuncio de la veda de agosto por parte de Sernapesca vuelve a poner el foco sobre la alarmante sobreexplotación de la merluza del sur (Merluccius australis), un habitante clave de la Patagonia chilena que lleva más de una década en crisis de conservación. Investigaciones científicas lideradas por la Dra. Lynne Sneddon confirman la sintiencia y capacidad de dolor físico en los peces, abriendo un debate ético sobre los métodos de extracción comercial, mientras gremios artesanales y ONGs como Oceana denuncian que un solo mes de veda es insuficiente frente a la pesca ilegal y la falta de un plan de recuperación efectivo.",
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
                            text: "Merluza austral (Merluccius australis) nadando en las profundidades de los fiordos patagónicos chilenos. Foto: La Especie",
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
                        text: "El Servicio Nacional de Pesca y Acuicultura (Sernapesca) anunció oficialmente el inicio de la veda biológica anual de la ",
                        size: 24
                    }),
                    new TextRun({
                        text: "merluza austral (Merluccius australis)",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ", también conocida como merluza del sur. La medida de administración pesquera regirá desde el ",
                        size: 24
                    }),
                    new TextRun({
                        text: "1 al 31 de agosto",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ", prohibiendo la extracción, comercialización, procesamiento, almacenamiento y transporte de este animal en estado fresco en todo el territorio nacional, según se detalla en el ",
                        size: 24
                    }),
                    new ExternalHyperlink({
                        children: [
                            new TextRun({
                                text: "comunicado oficial del organismo público",
                                color: "0563C1",
                                underline: true,
                                size: 24
                            })
                        ],
                        link: "https://www.sernapesca.cl/noticias/sernapesca-anuncio-el-inicio-de-la-veda-de-la-merluza-austral-con-la-campana-para-que-no-se-agote-tiene-que-pasar-agosto/"
                    }),
                    new TextRun({
                        text: ". La directora nacional del servicio, Soledad Tapia, advirtió desde Puerto Montt que infringir esta restricción constituye un delito que puede ser sancionado con penas de cárcel.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Sin embargo, detrás del lenguaje técnico-estatal que define a esta especie como un simple «recurso pesquero» y mide su existencia en «toneladas de desembarque» —con un total de ",
                        size: 24
                    }),
                    new TextRun({
                        text: "17.523 toneladas extraídas en 2025",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: " entre la flota artesanal e industrial— late una realidad ecológica y ética mucho más profunda. La merluza del sur no es una mercancía inerte: es un pez demersal longevo que puede vivir hasta ",
                        size: 24
                    }),
                    new TextRun({
                        text: "30 años",
                        bold: true,
                        color: "006D77",
                        size: 24
                    }),
                    new TextRun({
                        text: ", de lento crecimiento, y que habita las frías e indómitas profundidades de los canales y fiordos patagónicos de Chile.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // SECTION HEADING
            new Paragraph({
                text: "El milagro del desove y la estrecha ventana de agosto",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Científicamente, el desove (la liberación y fecundación de millones de huevos en el océano) representa un evento biológico coordinado de alta sensibilidad para la supervivencia de la especie. Las merluzas australes son desovadoras parciales (liberan sus gametos en tandas sucesivas) y sus principales focos reproductivos se localizan en los cañones y zonas profundas que rodean la isla Guamblin, en la Región de Aysén, así como al sur del paralelo 52º S en la Región de Magallanes.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Aunque agosto concentra el peak reproductivo, los estudios biológicos del ",
                        size: 24
                    }),
                    new ExternalHyperlink({
                        children: [
                            new TextRun({
                                text: "Instituto de Fomento Pesquero (IFOP)",
                                color: "0563C1",
                                underline: true,
                                size: 24
                            })
                        ],
                        link: "https://biblioteca.ifop.cl"
                    }),
                    new TextRun({
                        text: " indican que la actividad de desove se extiende activamente desde mediados de julio hasta finales de septiembre. Esto ha motivado a organizaciones de conservación como ",
                        size: 24
                    }),
                    new ExternalHyperlink({
                        children: [
                            new TextRun({
                                text: "Oceana Chile",
                                color: "0563C1",
                                underline: true,
                                size: 24
                            })
                        ],
                        link: "https://chile.oceana.org"
                    }),
                    new TextRun({
                        text: " y a comités de manejo pesquero a solicitar formalmente la ampliación de la veda. Limitar la protección a una ventana estricta de 31 días deja desamparadas a las poblaciones en las semanas previas y posteriores, permitiendo capturas de hembras maduras cargadas de huevos, lo que torpedea el proceso natural de repoblación.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // SECTION HEADING 2
            new Paragraph({
                text: "Más de una década de sobreexplotación bajo la sombra de la inacción",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "La vulnerabilidad física de la merluza del sur se ve gravemente agravada por una crisis de gestión pública crónica. De acuerdo con los informes de la ",
                        size: 24
                    }),
                    new ExternalHyperlink({
                        children: [
                            new TextRun({
                                text: "Subsecretaría de Pesca y Acuicultura (Subpesca)",
                                color: "0563C1",
                                underline: true,
                                size: 24
                            })
                        ],
                        link: "https://www.subpesca.cl/portal/616/w3-propertyvalue-50843.html"
                    }),
                    new TextRun({
                        text: ", la especie ha sido declarada oficialmente en estado de ",
                        size: 24
                    }),
                    new TextRun({
                        text: "sobreexplotación ininterrumpida desde el año 2013",
                        bold: true,
                        color: "B91C1C", // Red accent for risk
                        size: 24
                    }),
                    new TextRun({
                        text: ". Bajo el marco de la Ley General de Pesca y Acuicultura de Chile, las pesquerías catalogadas en colapso o sobreexplotación deben contar de manera obligatoria con un Plan de Recuperación.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Sin embargo, organizaciones ambientales y gremios pesqueros artesanales critican que el Estado ha postergado por más de diez años la implementación de un plan integral con cuotas reducidas y vedas de mayor duración. A esta inacción reguladora se suma el flagelo de la pesca ilegal —el llamado «pescado negro»— que en 2025 derivó en la incautación de más de ",
                        size: 24
                    }),
                    new TextRun({
                        text: "105 toneladas",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: " del recurso por parte de los servicios de fiscalización.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // SECTION HEADING 3
            new Paragraph({
                text: "Más allá de la biomasa: Sintiencia animal y trauma de extracción",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "El enfoque tradicional de la pesca trata a los animales marinos como meros bloques de biomasa disponibles para la extracción de renta. No obstante, la ciencia del bienestar animal ha derribado esta visión fría e instrumental. Las investigaciones de la ",
                        size: 24
                    }),
                    new TextRun({
                        text: "Dra. Lynne Sneddon",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ", bióloga marina y pionera en el estudio del dolor animal, han aportado evidencia contundente de que los peces poseen un sistema nociceptivo anatómicamente homólogo al de los vertebrados terrestres.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Sus estudios demuestran la presencia de receptores de dolor específicos en la cabeza y boca de los peces que responden al calor, presión y agentes químicos nocivos de la misma forma que en mamíferos o aves. Cuando sufren un daño físico, los peces no reaccionan mediante un simple «reflejo mecánico»: experimentan un estado afectivo negativo que altera su comportamiento social, suspende su alimentación y les genera altos niveles de cortisol, la hormona del estrés. Tienen, por ende, la capacidad de experimentar sufrimiento y traumas físicos.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // QUOTE / CALLOUT
            new Paragraph({
                children: [
                    new TextRun({
                        text: "«En la pesca de arrastre industrial, estos animales son capturados en redes gigantescas donde sufren aplastamiento y asfixia progresiva bajo el peso de otras capturas. Al ser extraídos rápidamente desde profundidades que superan los 200 metros, experimentan un violento trauma por descompresión (barotrauma): sus vejigas natatorias se expanden hasta reventar y sus órganos internos se rompen, provocándoles una agonía silenciosa pero físicamente devastadora».",
                        italic: true,
                        size: 22,
                        color: "0F172A"
                    })
                ],
                spacing: { left: 400, right: 400, before: 120, after: 300 }
            }),

            // SECTION HEADING 4
            new Paragraph({
                text: "Coexistencia y futuro de la pesca artesanal",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "La protección del ecosistema y de los seres sintientes que lo habitan no es enemiga de las comunidades locales; al contrario, es su única garantía de subsistencia. Juan García, presidente de la asociación gremial de merluceros de la Región de Los Lagos, defiende activamente el respeto de la veda biológica: ",
                        size: 24
                    }),
                    new TextRun({
                        text: "«Las vedas son para respetarlas. Yo soy parte del comité de manejo de la merluza austral y vemos cómo está el recurso... Los pescadores están súper conscientes de lo que significa la merluza para ellos, por lo tanto el cuidado es lo primordial»",
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
                        text: "Durante este mes de receso de capturas, los pescadores artesanales diversifican sus actividades ofreciendo otras especies de roca que no están en fase crítica de desove, como el robalo, pejegallo y la reineta. No obstante, para que este esfuerzo social tenga un impacto real, se requiere de políticas de largo plazo: establecer una talla mínima de captura estricta, prohibir definitivamente la pesca de arrastre industrial en sus zonas de distribución y perseguir penalmente el blanqueo y comercialización ilegal. Solo reconociendo el valor intrínseco de cada vida en el mar de la Patagonia será posible asegurar la coexistencia armónica de la pesca local y la preservación del ecosistema marino de Chile.",
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
                        text: "Para transformar el comunicado de prensa oficial e institucional de Sernapesca en un artículo periodístico de profundidad con la identidad característica de ",
                        size: 24
                    }),
                    new TextRun({
                        text: "La Especie",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ", se tomaron las siguientes decisiones de redacción y técnica periodística:",
                        size: 24
                    })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "1. Desmercantilización del Lenguaje:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Los informes institucionales y la prensa de negocios suelen referirse a los peces como «recursos pesqueros», «biomasa comercializable» o «toneladas de desembarque», despojándolos de su condición de seres vivos. En La Especie destacamos las características biológicas del animal, como su longevidad de hasta 30 años, y tratamos el desove como un complejo e importante evento vital para la continuidad de la especie, no de la industria.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "2. Incorporación Rigurosa de la Sintiencia y Bienestar Animal:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Para cumplir con el enfoque animalista de forma seria e indiscutible, citamos los estudios sobre nocicepción en peces liderados por la Dra. Lynne Sneddon publicados en la revista ",
                    size: 24
                }),
                new ExternalHyperlink({
                    children: [
                        new TextRun({
                            text: "The Royal Society",
                            color: "0563C1",
                            underline: true,
                            size: 24
                        })
                    ],
                    link: "https://doi.org/10.1098/rstb.2019.0290"
                }),
                new TextRun({
                    text: ". Explicamos de forma cruda pero técnica la crueldad intrínseca de los métodos comerciales de arrastre y el sufrimiento extremo del barotrauma (descompresión rápida), evidenciando que los peces experimentan dolor físico y estrés sistémico.",
                    size: 24
                })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "3. Contextualización Crítica e Investigación del Estado del Recurso:\n", bold: true, size: 24 }),
                    new TextRun({ text: "El lema institucional de Sernapesca («Para que no se agote, tiene que pasar agosto») insinúa que el cuidado recae solo en el consumidor durante este mes. Contrastamos esto investigando los datos de la Subsecretaría de Pesca, revelando que la especie lleva más de una década (desde 2013) catalogada oficialmente en estado de sobreexplotación y denunciando la grave omisión estatal al no implementar el Plan de Recuperación exigido por ley.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "4. Equilibrio Social y Ecológico:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Visibilizamos a la pesca artesanal de pequeña escala mediante la voz de sus líderes, quienes apoyan la veda como un acto de cuidado ecológico. Se deslinda su actividad del impacto devastador de la pesca de arrastre industrial y de las redes de comercio ilegal («pesca negra»), abogando por un modelo de coexistencia armónico que ponga fin a las prácticas insostenibles y al sufrimiento innecesario.", size: 24 })
                ],
                spacing: { after: 200 }
            })
        ]
    }]
});

// Write the Word document
Packer.toBuffer(doc).then((buffer) => {
    const filePath = path.join(outputDir, "Veda_de_la_merluza_austral_enfoque_cientifico_y_animalista.docx");
    fs.writeFileSync(filePath, buffer);
    console.log("Word document written successfully to:", filePath);
}).catch(err => {
    console.error("Error creating docx:", err);
});
