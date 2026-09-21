const fs = require('fs');

let content = fs.readFileSync('pages/projects/notre-methode.js', 'utf8');

// Add imports
content = content.replace(
  "import AnimateOnScreen from '../../components/AnimateOnScreen';",
  "import AnimateOnScreen from '../../components/AnimateOnScreen';\nimport { useLanguage } from '../../context/language';\nimport { translations } from '../../locales/notre-methode';"
);

// Add hooks
content = content.replace(
  "const currentPath = '/projects/notre-methode';",
  "const currentPath = '/projects/notre-methode';\n  const { lang } = useLanguage();\n  const t = translations[lang] || translations.fr;"
);

// Replace head
content = content.replace("<title>NOTRE MÉTHODE • CRAFTI STUDIO</title>", "<title>{t.metaTitle}</title>");
content = content.replace('content="Comment nous transformons un besoin numérique complexe en un écosystème fonctionnel. Méthodologie CRAFTI STUDIO."', 'content={t.metaDesc}');

// Replace MainTitle
content = content.replace("<MainTitle>NOTRE MÉTHODE</MainTitle>", "<MainTitle>{t.mainTitle}</MainTitle>");
content = content.replace("Comment nous transformons un besoin numérique complexe en un écosystème fonctionnel. Un projet de cette envergure ne peut être abordé simplement par <em>Design → Code → Livraison</em>. Il exige de la compréhension, de la coordination, une réflexion produit, une architecture technique et une validation continue.", "{t.heroLead}");
content = content.replace("“Chaque décision technique importante doit être liée à un besoin réel des utilisateurs, à une exigence opérationnelle ou à un objectif mesurable du projet.”", "{t.quote}");

// Steps heading
content = content.replace("<SectionTag>Architecture Étape par Étape</SectionTag>", "<SectionTag>{t.stepsTag}</SectionTag>");
content = content.replace("<SectionHeading>Les 9 Étapes de Notre Méthodologie</SectionHeading>", "<SectionHeading>{t.stepsHeading}</SectionHeading>");

// Step 1
content = content.replace('<span className="step-num">ÉTAPE 01</span>', '<span className="step-num">{t.step1Num}</span>');
content = content.replace('<h3 className="step-title">DÉCOUVRIR</h3>', '<h3 className="step-title">{t.step1Title}</h3>');
content = content.replace('<h4 className="step-subtitle">Comprendre avant de définir.</h4>', '<h4 className="step-subtitle">{t.step1Subtitle}</h4>');
content = content.replace("Nous commençons par les personnes, l'organisation et le contexte derrière le projet. En collaboration avec l'EMUC, nous examinons :", "{t.step1Body}");

// Step 2
content = content.replace('<span className="step-num">ÉTAPE 02</span>', '<span className="step-num">{t.step2Num}</span>');
content = content.replace('<h3 className="step-title">STRUCTURER</h3>', '<h3 className="step-title">{t.step2Title}</h3>');
content = content.replace('<h4 className="step-subtitle">Traduire les besoins en architecture.</h4>', '<h4 className="step-subtitle">{t.step2Subtitle}</h4>');
content = content.replace("L'écosystème numérique est divisé en composants fonctionnels : Expérience Utilisateur (Le visage de l'EMUC), Formation et Apprentissage (Les cours et la progression), Gestion de Contenu (L'administration), et Technologie (Les bases de données et APIs).", "{t.step2Body}");

// Step 3
content = content.replace('<span className="step-num">ÉTAPE 03</span>', '<span className="step-num">{t.step3Num}</span>');
content = content.replace('<h3 className="step-title">PROTOTYPER</h3>', '<h3 className="step-title">{t.step3Title}</h3>');
content = content.replace('<h4 className="step-subtitle">Visualiser avant de construire.</h4>', '<h4 className="step-subtitle">{t.step3Subtitle}</h4>');
content = content.replace("Nous concevons les parcours utilisateurs à travers des prototypes interactifs pour valider la direction visuelle et fonctionnelle, avant d'écrire la moindre ligne de code.", "{t.step3Body}");

// Step 4
content = content.replace('<span className="step-num">ÉTAPE 04</span>', '<span className="step-num">{t.step4Num}</span>');
content = content.replace('<h3 className="step-title">CONSTRUIRE</h3>', '<h3 className="step-title">{t.step4Title}</h3>');
content = content.replace('<h4 className="step-subtitle">Le développement itératif.</h4>', '<h4 className="step-subtitle">{t.step4Subtitle}</h4>');
content = content.replace("Nous n'attendons pas la fin pour tester. Nous construisons en itérations (sprints) : Backend et APIs, Interfaces Frontend (Web & Mobile), Intégrations Tierces, et Contrôle Qualité continu.", "{t.step4Body}");

// Step 5
content = content.replace('<span className="step-num">ÉTAPE 05</span>', '<span className="step-num">{t.step5Num}</span>');
content = content.replace('<h3 className="step-title">DÉPLOYER</h3>', '<h3 className="step-title">{t.step5Title}</h3>');
content = content.replace('<h4 className="step-subtitle">Lancement, formation et transfert.</h4>', '<h4 className="step-subtitle">{t.step5Subtitle}</h4>');
content = content.replace("Un projet réussi ne s'arrête pas au lancement. Nous assurons un déploiement progressif, formons l'équipe de l'EMUC pour l'autonomie, et mettons en place les systèmes de maintenance.", "{t.step5Body}");

// Agile
content = content.replace("<SectionTag>Exécution Agile</SectionTag>", "<SectionTag>{t.agileTag}</SectionTag>");
content = content.replace("<SectionHeading>Travailler avec l'EMUC</SectionHeading>", "<SectionHeading>{t.agileHeading}</SectionHeading>");
content = content.replace("Nous ne disparaissons pas pendant dix semaines pour revenir avec un produit fini. Chaque étape est visible, validée et alignée.", "{t.agileDesc}");
content = content.replace("“Nous ne souhaitons pas attendre la fin du projet pour découvrir que la solution ne correspond pas aux usages de l’EMUC. Nous construisons, démontrons, recueillons les retours et ajustons progressivement.”", "{t.agileQuote}");

// Nodes
content = content.replace('<span className="node">COMPRENDRE</span>', '<span className="node">{t.fComprendre}</span>');
content = content.replace('<span className="node">STRUCTURER</span>', '<span className="node">{t.fStructurer}</span>');
content = content.replace('<span className="node">PROTOTYPER</span>', '<span className="node">{t.fPrototyper}</span>');
content = content.replace('<span className="node">CONSTRUIRE</span>', '<span className="node">{t.fConstruire}</span>');
content = content.replace('<span className="node">DÉMONTRER</span>', '<span className="node">{t.fDemontrer}</span>');

// Resp
content = content.replace('<SectionTag>Gouvernance</SectionTag>', '<SectionTag>{t.respTag}</SectionTag>');
content = content.replace('<SectionHeading>Qui Fait Quoi ?</SectionHeading>', '<SectionHeading>{t.respHeading}</SectionHeading>');
content = content.replace('<th>ÉQUIPE EMUC</th>', '<th>{t.rTitleEMUC}</th>');
content = content.replace('<th>CRAFTI STUDIO</th>', '<th>{t.rTitleCrafti}</th>');
content = content.replace('<th>Phase</th>', '<th>{t.rPhase}</th>');
content = content.replace("<th>Rôle de l'EMUC</th>", "<th>{t.rRoleEMUC}</th>");
content = content.replace('<th>Rôle de Crafti</th>', '<th>{t.rRoleCrafti}</th>');

content = content.replace('<td>Découverte</td>', '<td>{t.rD}</td>');
content = content.replace("<td>Fournir l'accès, exprimer les besoins, définir la vision</td>", "<td>{t.rD_EMUC}</td>");
content = content.replace('<td>Auditer, analyser, structurer</td>', '<td>{t.rD_Crafti}</td>');

content = content.replace('<td>Prototypage</td>', '<td>{t.rP}</td>');
content = content.replace('<td>Tester, donner des retours, valider</td>', '<td>{t.rP_EMUC}</td>');
content = content.replace('<td>Concevoir, itérer, raffiner</td>', '<td>{t.rP_Crafti}</td>');

content = content.replace('<td>Construction</td>', '<td>{t.rC}</td>');
content = content.replace('<td>Revue régulière</td>', '<td>{t.rC_EMUC}</td>');
content = content.replace('<td>Développer, intégrer, assurer la QA</td>', '<td>{t.rC_Crafti}</td>');

content = content.replace('<td>Sécurité</td>', '<td>{t.rS}</td>');
content = content.replace('<td>Valider les exigences</td>', '<td>{t.rS_EMUC}</td>');
content = content.replace('<td>Architecturer + Tester + Déployer</td>', '<td>{t.rS_Crafti}</td>');

content = content.replace('<td>Documentation</td>', '<td>{t.rDoc}</td>');
content = content.replace("<td>S'approprier le système</td>", "<td>{t.rDoc_EMUC}</td>");
content = content.replace('<td>Transférer la connaissance</td>', '<td>{t.rDoc_Crafti}</td>');

content = content.replace('<td>Déploiement</td>', '<td>{t.rDep}</td>');
content = content.replace('<td>Lancement</td>', '<td>{t.rDep_EMUC}</td>');
content = content.replace('<td>Déployer, surveiller</td>', '<td>{t.rDep_Crafti}</td>');

content = content.replace('<td>Assistance initiale</td>', '<td>{t.rAss}</td>');
content = content.replace('<td>Remonter les problèmes</td>', '<td>{t.rAss_EMUC}</td>');
content = content.replace('<td>Support, correction</td>', '<td>{t.rAss_Crafti}</td>');

// Diff
content = content.replace('<h2>La Différence Crafti</h2>', '<h2>{t.diffTitle}</h2>');
content = content.replace("Nous ne commençons pas par demander : “Quelle technologie devrions-nous utiliser ?”<br />\n                Nous commençons par demander : “Qu'est-ce que ce système devrait rendre possible ?”", "{t.diffLead.split('\\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}");
content = content.replace("<div>• Qui en a besoin & comment l'utiliseront-ils ?</div>", "<div>{t.diffQ1}</div>");
content = content.replace("<div>• Quelles informations sont impliquées ?</div>", "<div>{t.diffQ2}</div>");
content = content.replace("<div>• Qui doit agir en conséquence ?</div>", "<div>{t.diffQ3}</div>");
content = content.replace("<div>• Que faut-il automatiser vs intervention humaine ?</div>", "<div>{t.diffQ4}</div>");
content = content.replace("<div>• Qu'est-ce qui doit être connecté ?</div>", "<div>{t.diffQ5}</div>");
content = content.replace("<div>• Comment le système devrait-il évoluer ?</div>", "<div>{t.diffQ6}</div>");

// Nav
content = content.replace('<h2>Du Besoin à la Réalité</h2>', '<h2>{t.nextTitle}</h2>');
content = content.replace("Un produit numérique connecté conçu pour servir les personnes et soutenir l'organisation derrière lui.", "{t.nextDesc}");
content = content.replace("Explorer l'Architecture du Projet", "{t.nextExplore}");

// RouteChip mapping
content = content.replace('<span>{route.title}</span>', '<span>{route.title[lang] || route.title.fr}</span>');

fs.writeFileSync('pages/projects/notre-methode.js', content, 'utf8');
