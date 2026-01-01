---
title: "Dépannage - Pop Player"
---

# Dépannage du boot sur Freebox Pop Player

## Glitch graphique au démarrage

Lors du démarrage sur Armbian, un **léger glitch graphique** peut apparaître à l’écran.  
Ce comportement est **sans gravité** et l’affichage se **stabilise automatiquement** après environ **10 secondes**.

Aucune action n’est nécessaire.

### Si le glitch ne se corrige pas

Si l’affichage **ne se rétablit pas** automatiquement, vérifiez le **DTB** utilisé.

Sur le support Armbian, ouvrez la partition `boot`, puis le fichier `uEnv.txt`, et assurez-vous que la ligne `FDT` pointe vers le DTB de la Pop Player :

```ini
FDT=/dtb/amlogic/meson-g12a-fbx8am.dtb
```

Enregistrez puis réessayez.

## Démarrage automatique sur le support Armbian

Une fois Armbian installé sur carte microSD (ou support externe), la Freebox Pop Player **démarre automatiquement** sur ce support après :
- un redémarrage,
- une extinction,
- ou une coupure de courant.

Pour démarrer à nouveau sur **Android TV**, il faut **retirer la carte microSD** (ou débrancher le support USB) avant de remettre la Freebox sous tension.
