---
title: "Installation - Pop Player"
---

# Installer Armbian sur Freebox Pop Player

Ce guide décrit la procédure pour démarrer **Armbian** sur une **Freebox Pop Player** à partir d’un support externe (microSD ou USB).

## Préambule

- **Ceci n'est pas un guide officiel de Free**, agissez à vos propres risques.
- Armbian **n’est pas installé** dans le stockage interne de la Freebox Pop Player (ce n’est pas autorisé par Free).
- Le support de stockage utilisé pour Armbian doit être **entièrement dédié** à cet usage.
- **Sauvegardez vos données** avant de commencer : l’écriture de l’image efface le disque ciblé.

## Prérequis

- Une Freebox Pop Player
- Un clavier USB
- Une carte microSD ou une clé USB suffisamment performante  
  - Si vous utilisez un stockage USB : prévoir un **hub USB** pendant l’installation pour brancher le clavier (plus nécessaire après).
  - Pour un usage long terme : un **SSD USB** est recommandé (plus fiable qu’une microSD ou une clé USB).
- Un écran (le fonctionnement sans écran est possible après l’installation)
- Une machine sous Linux

## Récupération des fichiers

1. Aller sur le dépôt : [ophub/amlogic-s9xxx-armbian](https://github.com/ophub/amlogic-s9xxx-armbian)

2. Aller dans :
   - Releases : [ophub/amlogic-s9xxx-armbian/releases](https://github.com/ophub/amlogic-s9xxx-armbian/releases)
   - Tags : [ophub/amlogic-s9xxx-armbian/tags](https://github.com/ophub/amlogic-s9xxx-armbian/tags)

3. Télécharger la **dernière release** correspondant à :
   - **Armbian arm64 server**
   - la distribution de votre choix (ex. Ubuntu Jammy)

Exemple (Ubuntu Jammy) :

`Armbian_25.11.0_amlogic_s905x2_jammy_6.12.62_server_2025.12.15.img.gz`

> Important : la Pop Player utilise un SoC **s905x2**, téléchargez l’image **générique** `..._s905x2_...` et non une image destinée à un appareil spécifique (par exemple `..._s905x2-hg680fj_...`).

## Vérification des fichiers (DTB)

Avant d’écrire l’image, vérifier que le DTB de la Pop Player est présent :

1. Ouvrir l’image téléchargée.
2. Dans la partition `boot`, vérifier la présence de :
   - `dtb/amlogic/meson-g12a-fbx8am.dtb`

La partition `boot` doit également contenir des overlays nommés :
- `meson-g12a-fbx8am-realtek.dtb`
- `meson-g12a-fbx8am-brcm.dtb`

Si ces fichiers sont présents, vous pouvez poursuivre.

## Écriture de l’image

1. Décompresser l’archive `.img.gz` pour obtenir un fichier `.img`.
2. Écrire l’image sur le support de stockage.

> ⚠️ L’écriture de l’image supprime toutes les données sur le disque spécifié. Assurez-vous de cibler le bon périphérique.

**Exemples :**

### Méthode `dd`

#### Cas USB

Formatter le support en **FAT32 MBR** :

```bash
sudo mkfs.vfat /dev/sdX
```

Écrire l’image sur le support :

```bash
sudo dd if=Armbian_25.11.0_amlogic_s905x2_jammy_6.12.62_server_2025.12.15.img of=/dev/sdX bs=16M status=progress
```

#### Cas microSD

Formatter le support en **FAT32 MBR** :

```bash
sudo mkfs.vfat /dev/mmcblk0
```

Écrire l’image sur la carte :

```bash
sudo dd if=Armbian_25.11.0_amlogic_s905x2_jammy_6.12.62_server_2025.12.15.img of=/dev/mmcblk0 bs=16M status=progress
```

### Méthode graphique (Utilitaire de disque GNOME)

1. Sélectionner le support de stockage.
2. Le formater en **FAT32 MBR**.
3. Utiliser l’option **Restaurer l’image disque** et choisir le fichier `.img`.

## Définition de la box (uEnv.txt)

Après écriture de l’image, définir le DTB de la Pop Player :

1. Ouvrir la partition `boot` sur le support.
2. Éditer le fichier `uEnv.txt`.
3. Modifier la ligne `FDT` (exemple) :

Avant :

```ini
FDT=/dtb/amlogic/meson-g12a-x96-max.dtb
```

Après :

```ini
FDT=/dtb/amlogic/meson-g12a-fbx8am.dtb
```

4. Enregistrer le fichier puis éjecter proprement le support.

## Démarrage (boot)

1. Éteindre la Freebox Pop Player et **débrancher** l’alimentation.
2. Brancher le support de stockage sur la Pop Player.
3. Rebrancher l’alimentation **en maintenant appuyé** le bouton **RESET** (près de la prise USB).

![RESET](https://www.free.fr/assets/img/hardware/v8-specifications-player-slide4.svg)
Source : [Free](https://www.free.fr/freebox/freebox-pop/)

4. Maintenir RESET ~10 secondes, jusqu’à l’affichage sur l'écran de :

`USB burning mode`

5. Armbian doit ensuite démarrer et lancer la configuration initiale en ligne de commande.

Au premier démarrage, Armbian redimensionne automatiquement la partition `root` pour utiliser tout l’espace disponible sur le support.

## Crédits

- ophub/amlogic-s9xxx-armbian : https://github.com/ophub/amlogic-s9xxx-armbian
- u-boot : https://github.com/u-boot/u-boot
- Thread “rom” (bugtracker Free) : https://dev.freebox.fr/bugs/task/39951
- Fork Linux Free : https://github.com/phhusson/linux/tree/fbx-v6.7
