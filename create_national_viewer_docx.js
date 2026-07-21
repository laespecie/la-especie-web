const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const outputDir = 'C:/Users/boris/OneDrive/Escritorio/La Especie';

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            // HEADER / BADGE
            new Paragraph({
                children: [
                    new TextRun({
                        text: "LA ESPECIE | SECCIÓN COMUNIDAD & LEGISLACIÓN",
                        bold: true,
                        color: "7C3AED", // Purple accent
                        size: 20, // 10pt
                        font: "Arial"
                    })
                ],
                spacing: { after: 120 }
            }),

            // MAIN TITLE
            new Paragraph({
                text: "Proteger a los más vulnerables en la tormenta: Visor de Emergencia integra refugios para mascotas y albergues 'Código Azul'",
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 200 }
            }),

            // SUBTITLE / BAJADA
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Frente al embate del sistema frontal y con más de 500 personas damnificadas, la plataforma del Ministerio de Bienes Nacionales consolida información en tiempo real de 17 instituciones. En esta actualización, se incorporan refugios temporales para animales de compañía y personas en situación de calle, reforzando la idea de que en una catástrofe, salvar vidas abarca a todos los integrantes del hogar.",
                        italic: true,
                        size: 24, // 12pt
                        color: "475569"
                    })
                ],
                spacing: { after: 400 }
            }),

            // DIVIDER LINE / BYLINE
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Por Redacción La Especie  |  Publicado: 21 de Julio de 2026",
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
                        text: "El dolor y la incertidumbre de una catástrofe natural no discriminan entre humanos y animales. Los sistemas frontales que azotan al país no solo representan pérdidas materiales y de infraestructura, sino una dura prueba para la empatía, la supervivencia y la solidaridad social. En este escenario crítico, el Ministerio de Bienes Nacionales ha actualizado su ",
                        size: 24
                    }),
                    new TextRun({
                        text: "Visor Territorial de Emergencia",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ", una herramienta digital interactiva desarrollada por el SNIT-IDE Chile que integra información en tiempo real de 17 instituciones públicas para coordinar de mejor forma la ayuda hacia las personas y sus compañeros animales.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Una de las grandes novedades y avances con enfoque social de esta última actualización es la incorporación del catastro en tiempo real de ",
                        size: 24
                    }),
                    new TextRun({
                        text: "refugios temporales para mascotas",
                        bold: true,
                        color: "7C3AED",
                        size: 24
                    }),
                    new TextRun({
                        text: ". Históricamente, uno de los mayores dolores en las inundaciones y evacuaciones forzosas ha sido el abandono involuntario de mascotas o la resistencia de las familias a dejar zonas de peligro por no querer abandonar a sus perros y gatos. Al visibilizar oficialmente los lugares que reciben animales, se da un paso histórico hacia el reconocimiento de la familia multiespecie ante catástrofes.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Actualmente, el visor detalla la existencia de ",
                        size: 24
                    }),
                    new TextRun({
                        text: "7 refugios temporales de emergencia para mascotas",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: " a nivel nacional. Sin embargo, dado que la emergencia es dinámica, el ministerio ha habilitado un formulario interactivo en línea para que los propios municipios, agrupaciones de rescatistas y equipos en terreno puedan registrar nuevos espacios aptos para recibir animales, logrando una actualización comunitaria permanente.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "En paralelo a la protección animal, la plataforma georreferencia de forma detallada ",
                        size: 24
                    }),
                    new TextRun({
                        text: "347 albergues habilitados para personas",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ", incluyendo de forma prioritaria los puntos del programa ",
                        size: 24
                    }),
                    new TextRun({
                        text: "Código Azul",
                        bold: true,
                        color: "0C2340",
                        size: 24
                    }),
                    new TextRun({
                        text: " del Ministerio de Desarrollo Social y Familia. Estos albergues temporales de Código Azul se activan en las jornadas de temperaturas extremas y mal tiempo para salvaguardar a personas en situación de calle, el grupo humano más expuesto y desprotegido de nuestra sociedad, entregándoles abrigo, techo y alimentación caliente.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // QUOTE 1
            new Paragraph({
                children: [
                    new TextRun({
                        text: "«En una emergencia, contar con información confiable y actualizada es tan importante como disponer de los recursos para responder. Nuestro Visor Territorial reúne en un solo lugar información oficial sobre la afectación a las personas, el estado de la infraestructura crítica, los albergues, centros de acopio y refugios para mascotas, permitiendo que las autoridades tomen mejores decisiones y que la ciudadanía pueda acceder a información útil cuando más la necesita», señala Catalina Parot, Ministra de Bienes Nacionales.",
                        italic: true,
                        size: 22,
                        color: "0F172A"
                    })
                ],
                spacing: { left: 400, right: 400, before: 120, after: 300 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "El reporte consolida el impacto actual del sistema frontal a nivel país: se registran 516 personas damnificadas, 800 albergadas, 1.181 aisladas y 5.626 viviendas con daños confirmados. El visor no solo sirve como mapa de salvación para civiles, sino también para canalizar la ayuda solidaria, georreferenciando los centros de acopio oficiales donde la comunidad puede hacer llegar donaciones de alimentos para personas y alimento para animales afectados.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Cualquier persona puede ingresar libremente a consultar el mapa e identificar los refugios de personas y mascotas más cercanos a través del enlace oficial del visor de emergencias: ",
                        size: 24
                    }),
                    new TextRun({
                        text: "https://idechile.maps.arcgis.com/apps/dashboards/32d25c2ec3d24a968bde454f9a02d4d7",
                        bold: true,
                        color: "7C3AED",
                        size: 24
                    }),
                    new TextRun({
                        text: ".",
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
                        text: "Para convertir un comunicado estatal frío e institucional en una nota con alto impacto social e identidad para ",
                        size: 24
                    }),
                    new TextRun({
                        text: "La Especie",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ", se aplicaron las siguientes estrategias periodísticas:",
                        size: 24
                    })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "1. Enfoque en la Vulnerabilidad Social y el Concepto de Familia Multiespecie:\n", bold: true, size: 24 }),
                    new TextRun({ text: "El comunicado original del gobierno listaba de forma genérica la infraestructura crítica y las viviendas dañadas. Para La Especie, decidimos estructurar la nota a partir del dolor social: el sufrimiento de las personas en situación de calle ante el frío extremo (Código Azul) y la desesperación de las familias vulnerables por proteger a sus animales en una evacuación. Este enfoque humanizado conecta mucho mejor con el corazón del lector.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "2. Revalorización de los Refugios para Mascotas en Situaciones de Desastre:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Aunque el visor contiene 347 albergues de personas y solo 7 de mascotas, colocamos la protección animal en el titular y en el segundo párrafo. El periodismo con enfoque animalista busca visibilizar avances en políticas públicas de rescate. Explicamos al lector por qué es crucial que el estado empiece a registrar refugios animales para evitar el doloroso abandono forzoso durante rescates en bote o helicóptero.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "3. Aplicación de la Estructura de Pirámide Invertida:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Organizamos el texto desde lo más urgente y social (albergues, Código Azul, y animales) hacia los detalles más duros e institucionales (estadísticas generales de viviendas afectadas, número de visualizaciones y citas ministeriales). Esto garantiza que el lector retenga lo esencial desde los primeros segundos de lectura.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "4. Herramienta de Servicio Público Activo:\n", bold: true, size: 24 }),
                    new TextRun({ text: "Evitamos el estilo puramente pasivo de informar sobre un mapa que ya existe. Invitamos activamente a la comunidad, rescatistas y municipios a usar el enlace para buscar ayuda inmediata o a registrar nuevos refugios en terreno usando el formulario oficial. De esta forma, la noticia se transforma en una herramienta de utilidad directa para salvar vidas.", size: 24 })
                ],
                spacing: { after: 200 }
            })
        ]
    }]
});

Packer.toBuffer(doc).then((buffer) => {
    const filePath = path.join(outputDir, "Noticia_Visor_Bienes_Nacionales.docx");
    fs.writeFileSync(filePath, buffer);
    console.log("File written successfully to:", filePath);
}).catch(err => {
    console.error("Error creating docx:", err);
});
