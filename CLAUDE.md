# CLAUDE.md — mathieuthomasset.fr

Instructions et contexte pour les sessions de travail sur ce projet.

---

## Stack technique

- **Middleman 4.6.2** (Ruby, site statique)
- **Bootstrap 3.4.1** (CDN), Font Awesome 4.7.0 (CDN)
- **jQuery 1.12.4** (CDN), GLightbox 3.2.0, Masonry 4.2.2, imagesLoaded 4.1.4
- **Déploiement** : GitHub Pages via middleman-deploy
- **Push GitHub** : SSH ne fonctionne pas — toujours utiliser HTTPS avec token :
  ```
  GH_TOKEN=$(gh auth token) && git push "https://mathosset:${GH_TOKEN}@github.com/mathosset/photoj.git" master
  ```
- **Pull GitHub** : même méthode :
  ```
  GH_TOKEN=$(gh auth token) && git pull "https://mathosset:${GH_TOKEN}@github.com/mathosset/photoj.git" master
  ```
- **Build** : `bundle exec middleman build`
- **Commits** : en français, co-signed `Claude Sonnet 4.6 <noreply@anthropic.com>`

---

## Conventions importantes

- **URLs canoniques** : `preferred_url` dans le frontmatter de chaque page (format `https://`)
- **Détection articles blog** : `current_page.data.date` — présent uniquement dans les articles de blog, jamais dans les pages statiques
- **Lambda ERB** : dans les templates ERB, utiliser `_mtime = ->(path) { ... }` et non `def _mtime` (les méthodes `def` ne fonctionnent pas dans le contexte ERB de Middleman)
- **Données avec tirets** : les fichiers data avec tirets (`artisan-vendee.yml`) ne sont pas accessibles via `data.artisan_vendee` — toujours nommer les fichiers data avec des **underscores** (`artisan_vendee.yml`)
- **Espaces insécables** : certains fichiers source contiennent des `\u00a0` (non-breaking spaces) hérités — si un Edit échoue sur une correspondance, réécrire le fichier entier avec Write

---

## Ce qui a été fait — Audit SEO Étape 1

- Migration HTTP → HTTPS sur tous les fichiers (34 fichiers)
- `loading="lazy"` ajouté sur les 38 images
- `rel="preconnect"` + `rel="dns-prefetch"` pour Google Fonts
- JSON-LD complété : ProfessionalService, BreadcrumbList (pages internes), Article (articles blog)
- Sitemap réécrit dynamiquement : 8 → 50 URLs (pages, blog, tirages)
- Dépendances Phase 1 : Bootstrap 3.2.0 → 3.4.1, FA 4.6.1 → 4.7.0, CDN épinglés
- Gems supprimés : `jquery-middleman`, `font-awesome-sass` (chargés via CDN)

---

## Ce qui a été fait — Audit SEO Étape 2

### P0 — Corrections sémantiques
- `/publications` : nouveau H1 "Photographe de presse en Vendée — Publications & Agences" (fin du doublon homepage) + intro enrichie (carte de presse, AFP, Reuters, 150+ titres)
- `/bio` : H1 intégré dans le texte existant "Photographe professionnel en Vendée — Presse, entreprises, institutions & artisans" (sans élément visuel ajouté) ; équivalent visuel EN avec `style` inline identique au CSS `body h1`
- Création `/photographe-la-roche-sur-yon` (préfecture Vendée, zéro concurrent)
- Création `/photographe-artisan-vendee` + galerie `data/artisan_vendee.yml` dédiée (11 images)

### P1 — Nouvelles pages et maillage
- Refonte `/photographe-nantes` : suppression mariage/particuliers, recentrage B2B pur
- Création `/photographe-agriculture-vendee` + galerie `data/agriculture_vendee.yml` (10 images) + liens vers 6 articles blog ferme
- Liens internes ajoutés dans les 6 articles "portraits de ferme" → `/photographe-agriculture-vendee`

### P2 — Contenu
- FAQ Q4 "portrait LinkedIn professionnel en Vendée" ajoutée dans `/portraits`
- 3 articles de blog rédigés et illustrés (3 photos chacun) :
  - `/portrait-linkedin-professionnel-vendee`
  - `/preparer-reportage-photo-entreprise-vendee`
  - `/photo-savoir-faire-artisanal-vendee`

---

## Ce qui reste à faire

### Immédiat — En suspens
- **Galerie `/photographe-la-roche-sur-yon`** : utilise actuellement `data.vendee` (galerie générale). L'utilisateur a indiqué avoir fait sa sélection de son côté mais aucune galerie dédiée `roche_sur_yon.yml` n'a été créée. À confirmer si une galerie dédiée est souhaitée.

### Phase 2 dépendances — À faire plus tard
- **Migration jQuery 1.12.4 → 3.7.1** (CVE actives)
  - Le code `all.js` est compatible jQuery 3 (utilise `.on()`, `.length`, `.attr()`)
  - Tester manuellement après migration : carousel Bootstrap, galerie tirages (GLightbox/swipebox), Masonry sur /publications, formulaire contact
  - Simple changement de CDN dans `source/layouts/layout.erb`

### Audit SEO Étape 3 — Non commencé
**A. Conversion**
- CTAs cohérents sur toutes les pages (texte, placement, visibilité)
- Page `/demande-de-contact` : formulaire, friction, message de confirmation
- Page `/tirages` : fiche produit, confiance, tunnel d'achat

**B. Performance technique**
- Core Web Vitals : LCP, CLS, FID
- Images : compression et formats modernes (WebP)
- Ressources bloquantes : jQuery, Bootstrap chargés en CDN synchrone

**C. Données structurées**
- Schema.org `Product` sur les pages tirages (prix, disponibilité)
- Schema.org `FAQPage` sur les pages avec FAQ existante (`/portraits`)

**D. Maillage interne global**
- Vérifier que les nouvelles pages (La Roche, artisan, agriculture) sont liées depuis au moins une autre page du site (homepage, nav, /portraits, /entreprise)

---

## Décisions importantes prises

| Décision | Détail |
|---|---|
| HTTPS partout | Toutes les URLs internes et CDN en `https://` — ne jamais revenir en `http://` |
| Pas de H1 doublon | Chaque page doit avoir un H1 unique et différent des autres pages |
| Blog détecté par `date` | Seuls les articles de blog ont `date:` dans le frontmatter — ne pas ajouter `date:` aux pages statiques |
| Galeries dédiées par page | Chaque nouvelle page SEO locale a son propre fichier yml (`artisan_vendee.yml`, `agriculture_vendee.yml`) plutôt que de réutiliser un yml partagé |
| `/photographe-nantes` 100% B2B | Toute référence au mariage et aux particuliers supprimée — ne pas réintroduire |
| Portfolio mariage supprimé | Le lien `Portfolio_Mariage_MThomasset.pdf` retiré de `/photographe-nantes` |
| jQuery migration différée | La migration 1.12.4 → 3.7.1 est volontairement reportée — ne pas la faire sans tests manuels complets |
| Sitemap dynamique | Le sitemap est généré par ERB depuis les fichiers source — ne pas créer de sitemap statique |
| Commits en français | Messages de commit en français, toujours co-signés Claude Sonnet 4.6 |
