const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const outputDir = 'C:/Users/boris/OneDrive/Escritorio/La Especie/Día Mundial del Perro';

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            // HEADER / BADGE
            new Paragraph({
                children: [
                    new TextRun({
                        text: "LA ESPECIE | SECCIÓN MASCOTAS & BIENESTAR",
                        bold: true,
                        color: "15803D", // Green accent
                        size: 20, // 10pt
                        font: "Arial"
                    })
                ],
                spacing: { after: 120 }
            }),

            // MAIN TITLE
            new Paragraph({
                text: "Día Mundial del Perro: el 87% de los chilenos los considera parte de su familia, pero más de 3,5 millones deambulan sin supervisión",
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 200 }
            }),

            // SUBTITLE / BAJADA
            new Paragraph({
                children: [
                    new TextRun({
                        text: "En el marco de la conmemoración de este 21 de julio, especialistas recuerdan que amar a un perro va mucho más allá del afecto: la tenencia responsable, el registro legal y cinco cuidados veterinarios esenciales son fundamentales para garantizar su salud durante toda su vida.",
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
                        text: "Cada 21 de julio se conmemora el ",
                        size: 24
                    }),
                    new TextRun({
                        text: "Día Mundial del Perro",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ", una fecha destinada a reflexionar sobre el rol que cumplen estos compañeros caninos en nuestras vidas y a reforzar la importancia del compromiso de por vida que exige su cuidado. En Chile, el vínculo afectivo con las mascotas ha alcanzado niveles históricos: según el último estudio de la consultora Cadem, el ",
                        size: 24
                    }),
                    new TextRun({
                        text: "86% de las personas encuestadas declaró tener al menos una mascota",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: " en su hogar, y de ese grupo, un abrumador ",
                        size: 24
                    }),
                    new TextRun({
                        text: "87% afirmó considerarla un miembro oficial de su familia",
                        bold: true,
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
                        text: "Sin embargo, esta profunda conexión afectiva contrasta con una dura realidad nacional en materia de tenencia responsable. Un estudio elaborado por la Facultad de Medicina Veterinaria de la Universidad Católica para la Subsecretaría de Desarrollo Regional (SUBDERE) estimó que cerca de ",
                        size: 24
                    }),
                    new TextRun({
                        text: "3,5 millones de perros circulan por las vías públicas sin supervisión en Chile",
                        bold: true,
                        color: "B91C1C",
                        size: 24
                    }),
                    new TextRun({
                        text: ". El reporte reveló además una preocupante proporción: por cada 2,4 perros con tutor responsable, se observa aproximadamente a uno deambulando libremente en la calle.",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // QUOTE 1
            new Paragraph({
                children: [
                    new TextRun({
                        text: "«Permitir que un perro salga sin supervisión lo expone directamente a accidentes de tránsito, contagio de enfermedades, peleas con otros animales y extravíos. La tenencia responsable implica mantenerlo identificado, registrado y siempre acompañado al salir de casa», advierte el médico veterinario Diego Rugeles, especialista y gerente técnico de POEMA®.",
                        italic: true,
                        size: 22,
                        color: "0F172A"
                    })
                ],
                spacing: { left: 400, right: 400, before: 120, after: 300 }
            }),

            // SECTION HEADING
            new Paragraph({
                text: "Cinco pilares esenciales para garantizar su salud y bienestar",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Para promover una vida sana y feliz en cada etapa de la vida canina, el especialista detalla cinco recomendaciones fundamentales que todo tutor debe poner en práctica:",
                        size: 24
                    })
                ],
                spacing: { after: 240 }
            }),

            // LIST ITEM 1
            new Paragraph({
                children: [
                    new TextRun({ text: "1. Alimentación adecuada e hidratación constante: ", bold: true, size: 24 }),
                    new TextRun({ text: "La nutrición debe ajustarse estrictamente a la edad, tamaño, nivel de actividad física y estado de salud individual. No todos los perros requieren las mismas calorías ni nutrientes. Asimismo, contar con acceso permanente a agua limpia y fresca es indispensable, sobre todo tras realizar ejercicio o en días calurosos.", size: 24 })
                ],
                spacing: { after: 180 }
            }),

            // LIST ITEM 2
            new Paragraph({
                children: [
                    new TextRun({ text: "2. Controles veterinarios preventivos: ", bold: true, size: 24 }),
                    new TextRun({ text: "Las visitas periódicas al profesional permiten mantener el calendario de vacunas y desparasitaciones al día, además de detectar de forma precoz patologías que en sus etapas iniciales no muestran síntomas evidentes.", size: 24 })
                ],
                spacing: { after: 180 }
            }),

            // LIST ITEM 3
            new Paragraph({
                children: [
                    new TextRun({ text: "3. Ejercicio físico y estimulación mental: ", bold: true, size: 24 }),
                    new TextRun({ text: "Los paseos diarios no solo cumplen la función de ejercitar el cuerpo, sino que son fundamentales para canalizar el estrés, explorar olores y socializar. La intensidad debe ser adaptada si se trata de cachorros, perros sénior o con problemas de movilidad.", size: 24 })
                ],
                spacing: { after: 180 }
            }),

            // LIST ITEM 4
            new Paragraph({
                children: [
                    new TextRun({ text: "4. Identificación y registro oficial (Microchip): ", bold: true, size: 24 }),
                    new TextRun({ text: "En el marco de la Ley de Tenencia Responsable, es obligatorio implantar el microchip e inscribir al animal en el Registro Nacional de Mascotas. Mantener los datos de contacto actualizados es la herramienta más efectiva para asegurar el reencuentro en caso de extravío.", size: 24 })
                ],
                spacing: { after: 180 }
            }),

            // LIST ITEM 5
            new Paragraph({
                children: [
                    new TextRun({ text: "5. Respetar sus tiempos, paciencia y empatía: ", bold: true, size: 24 }),
                    new TextRun({ text: "Cada perro posee una personalidad e historia única. En el caso de animales rescatados o adoptados, la adaptación requiere tiempo, rutinas estables y paciencia. Nunca se debe castigar el miedo ni la ansiedad; ante conductas complejas, se debe buscar asesoría profesional.", size: 24 })
                ],
                spacing: { after: 280 }
            }),

            // QUOTE 2 / CONCLUSION
            new Paragraph({
                children: [
                    new TextRun({
                        text: "«El mejor tributo que podemos rendirles en este Día Mundial del Perro es evaluar si estamos respondiendo con hechos a sus necesidades. El afecto es el motor, pero la responsabilidad diaria, la salud preventiva y el tiempo de calidad son el verdadero compromiso de amor», concluye el Dr. Rugeles.",
                        italic: true,
                        size: 22,
                        color: "0F172A"
                    })
                ],
                spacing: { left: 400, right: 400, before: 120, after: 400 }
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
                        text: "Para transformar un comunicado de prensa corporativo en una noticia periodística de alto impacto para ",
                        size: 24
                    }),
                    new TextRun({
                        text: "La Especie",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ", se aplicaron las siguientes decisiones de redacción y técnica periodística:",
                        size: 24
                    })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "1. Titular de Gran Impacto Noticioso (Pirámide Invertida):\n", bold: true, size: 24 }),
                    new TextRun({ text: "El comunicado original tenía un título frío y genérico (\"Día Mundial del Perro: cinco cuidados esenciales...\"). Para un medio digital, el titular debe enganchar al lector. Cruzamos el dato emocional positivo de Cadem (87% lo considera familia) con la cifra impactante de la UC/Subdere (3,5 millones sin supervisión). Este contraste genera curiosidad e interés inmediato.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "2. Estructura de Lectura Ágil y Escaneable:\n", bold: true, size: 24 }),
                    new TextRun({ text: "En periodismo digital, los lectores escanean la pantalla. Organizamos las recomendaciones del veterinario en una lista numerada con negritas en las palabras clave. Esto facilita que el lector capte los puntos principales en segundos desde su teléfono móvil.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "3. Manejo Ético y Equilibrado de la Fuente (Sin sonar a publicidad):\n", bold: true, size: 24 }),
                    new TextRun({ text: "El comunicado original proviene de la marca de alimento POEMA®. En periodismo independiente, no se debe hacer publicidad encubierta. Presentamos al Dr. Diego Rugeles en su rol de experto médico veterinario y desplazamos la información comercial al crédito institucional, logrando una nota 100% informativa y confiable.", size: 24 })
                ],
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [
                    new TextRun({ text: "4. Enfoque alineado con la identidad de La Especie:\n", bold: true, size: 24 }),
                    new TextRun({ text: "La línea editorial de La Especie busca promover el respeto y el bienestar animal. El texto no solo da consejos de salud física, sino que enfatiza la empatía, el respeto a la salud mental del perro y el cumplimiento de la Ley de Tenencia Responsable (Ley Cholito).", size: 24 })
                ],
                spacing: { after: 200 }
            })
        ]
    }]
});

Packer.toBuffer(doc).then((buffer) => {
    const filePath = path.join(outputDir, "Noticia_Dia_Mundial_del_Perro.docx");
    fs.writeFileSync(filePath, buffer);
    console.log("File written successfully to:", filePath);
}).catch(err => {
    console.error("Error creating docx:", err);
});
