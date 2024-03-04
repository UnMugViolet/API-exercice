## Gestionnaire de location d’appartement.
- Un immeuble contient plusieurs appartements.
- Décrire l’immeuble de telle manière à ce qu’il soit identifiable (Adresse, Date de
construction, …).
- Un immeuble peut disposer d’équipements communs (ascenseur, parc, hall, conciergerie,
…), et un même équipement commun peut se retrouver sur plusieurs immeubles. Il est à
noter que certains de ses équipements communs ont des visés à but de sécurité (ex :
extincteurs, portes coupe-feu, escalier extérieur, etc…), et que dans leur cas, une date de
« dernière inspection » doit être enregistré.
o Lorsqu’un équipement commun de sécurité est alloué à un immeuble, si aucune
date de dernière inspection n’est spécifiée, il devra être fixé par défaut à la date de
construction du bâtiment.
- Décrire l’appartement de telle manière à ce qu’il soit identifiable (Numéro de porte, étage,
…).
- Un appartement a un type (Studio, T2, T3, …), et de ce type dépend le nombre maximum
théorique d’occupant.
- Un appartement a un propriétaire, et un propriétaire peut disposer de plusieurs
appartements.
- Un apparentement peut avoir des options (balcon, cave privative, place de parking, …), et
une même option peut se retrouver sur plusieurs appartements.
- Un appartement a plusieurs locataires, mais un locataire n’a qu’un seul appartement.
- Propriétaire et locataire sont des personnes et il serait bon qu’ils soient tous deux
représentés par un héritage avec les particularités suivantes.
o Le propriétaire a un numéro de compte et un champ doit indiquer s’il est assujetti à
la TVA.
o L’un des locataires d’un appartement est désigné comme étant le “locataire
principal”. Si cette donnée devait être mise à jour, alors toute autre locataire du
même appartement doit être mis à jour pour s’assurer de l’unicité de cette donnée.
o Afin de facilité la gestion, ajouter une sous-propriété spécial à l’appartement pour
faire apparaître ce locataire principal sans avoir à en demander toute la liste.
- Dans le cadre de l’application, pour un affichage individuel des immeubles, il est souhaité
qu’il puisse mettre en évidence les données suivantes : le nombre total d’appartement, un
taux de % d’appartement actuellement occupé, le nombre total d’habitant dans tout
l’immeuble, le nombre d’appartement en sous-occupation (càd occupé, mais par une seule
personne), et ceux en sur-occupation.
- Dans le cadre de la gestion et l’affichage des propriétaires, il est demandé de faire apparaitre
en plus de leurs informations, la somme des loyers déjà perçu dans l’année en cours.

- Faire les API et les routes qui permettent de gérer les immeubles
(ajouter/modifier/supprimer, et leur allouer des appartements), gérer les appartements
(création, gestion des locataires), gérer les personnes (locataire et propriétaires), et certains
affichages de données spécifiques.

Disponible ici : 

https://api.screenup.net/api#/
