---
title: "Introduction to CFD: compressible gas dynamics"
date: "2024-13-32"
excerpt: "Please come back later... I am making the best use of my spare time on this..."
thumbnailUrl: "/under_construction.jpeg"
---

This blog serves as a friendly yet practical guide to understanding inviscid compressible fluid dynamics, progressing from the governing mathematical equations to a core problem of the model: the Riemann problem. The following contents will answer 2 questions, drawing great inspiration from Professor Eleuterio Toro's book [1].
1. How do we perceive a fluid, and use a model to describe it?
2. How do we solve the model we have just prepared?

## 1. How do we perceive a fluid, and use a model to describe it?

"Big whorls have little whorls
Which feed on their velocity
And little whorls have lesser whorls,
And so on to viscosity."
--- Lewis Fry Richardson

### I think Minecraft is good for understanding fluid flows?
Have a look at the following 1-second evolution of whorls prepared by Jacob [2]. What can you say about it?
![](/blogs/01_intro_to_cfd_compressible/fluid_eddies_evolution.png)

"Beautiful eddies, good-looking flows👏 And... (Shrug) That's all."
--- a guy named Zian Huang

Eddies, and their smaller eddies within, are quite an abstraction of nature. It would be challenging to use mere English words to accurately describe how fluid flows.

We therefore need a deterministic and systematic way to describe a fluid at a given time ($t$). One such method is to use discretization to approximate our continuous reality. This can be thought of as applying a mosaic effect to the snapshots above. Now we can gain some extra insights: at the box location $(10,14)$ on a sliced x-y plane – 10 boxes to the right and 14 boxes up starting at the bottom left – as time passes and marches ahead, the intensity of the color dye fades away. Notice that each individual mosaic box is completely represented by its contained color, as a volume average of the actual intensity at each point within the box. This uniform distribution of fluid attribute, where each box holds a single value, is named as the *piece-wise constant* configuration.
![](/blogs/01_intro_to_cfd_compressible/mosaic_fluid_eddies_evolution.png)

As the size of these boxes continues to shrink ($\Delta x \Delta y \Delta z \rightarrow 0$), we are moving from a 240p fluid to a 4K fluid and beyond! As the time difference drops from $\Delta t = 1$ second and tends to zero ($\Delta t \rightarrow 0$), we are blinking our eyes faster than a machine gun! As the distance between these discrete elements reduces, people do feel more and more confident that this piece of mosaic animation is starting to get realistic.

Since we have just discretised time and space into boxes and frames, this is a good time to introduce the concept of a control volume. Imagine the fluid we wish to model lives within those 3D blocks in Minecraft, also known as the Cartesian grids. In the above case, these container boxes carry the information of color intensity (decreasing intensity: orange -> yellow -> white). In a simple flow simulation, key attributes of a fluid such as density ($\rho$), momentum ($\rho \mathbf{u} = \rho (u, v, w)^T$), and total energy ($E$) would replace color intensity to meet our interests:
![](/blogs/01_intro_to_cfd_compressible/drake_meme.png "width=500")
### Euler equation: the inviscid holy grail of fluid mechanics

We have had our canvas ready. There are a lot of boxes filled with fluid attributes await to be evolved in time. The next step is to come up with the mathematical model dynamically governing these attributes.

Our first objective - compressibility - suggests that density can be a variable in space. By assuming there is no chemical reaction and that the total mass of the fluid system stays constant, we have:
$$
\begin{equation*}
\underbrace{\frac{\partial \rho}{\partial t}}_{\text{D1}} + \underbrace{\mathbf{u}\cdot\mathbf{\nabla}\rho}_{\text{D2}} = -\underbrace{\rho \mathbf{\nabla}\cdot\mathbf{u}}_{\text{C1}},
\end{equation*}
$$
with the grad operator being defined as $\mathbf{\nabla}=(\frac{\partial}{\partial x},\frac{\partial}{\partial y},\frac{\partial}{\partial z})^T$. The superscript $^T$ indicates the transpose of a matrix.

Term $\textnormal{D1}$ refers to the independent change of density at a fixed location of focus. $\textnormal{D2}$ accounts for the potential change due to fluid displacement by the surroundings: flows with different density values approaching, and/or local fluid parcels with non-zero density leaving. Lastly, $\textnormal{C1}$ forms the essence of compressibility, as it represents density change due to the divergence of fluid velocity. This continuity equation can be intuitively understood as: if there is a gathering of fluid (negative $\mathbf{\nabla}\cdot\mathbf{u}$), the density of the box at that location should rise, and conversely, if there is a spreading of fluid (positive $\mathbf{\nabla}\cdot\mathbf{u}$), the density at that location should go down. This potential change must be balanced either by a variation in the density value at that point ($\textnormal{D1}$), or by the advection of fluid from its neighbors ($\textnormal{D2}$). The negative sign before $\textnormal{C1}$ indicates that density changes in the opposite direction to the way we define divergence: positive divergence (fluid spreading) leads to a decrease in density. In addition, density ($\rho$) is present to the power of one, meaning that the rise in density as fluid accumulates is a process of linear addition.

By considering the vector identity $\mathbf{\nabla}\cdot(\rho\mathbf{u}) = \mathbf{u}\cdot\mathbf{\nabla}\rho+\rho\mathbf{\nabla}\cdot\mathbf{u}$, we can rewrite the density equation as:
$$
\frac{\partial \rho}{\partial t} + \mathbf{\nabla}\cdot(\rho\mathbf{u}) = 0.
$$

With density and compressibility defined, the next step is to work on the momentum dynamics, and there you will meet the holy grail of fluid mechanics – the Navier-Stokes equation. Here, I'll present the *conservative* inviscid form of this legendary equation of motion, known as *the Euler equation* [3]. At a point in space, fluid momentum would change according to:
$$
\begin{equation*}
\underbrace{\frac{\partial (\rho u_i)}{\partial t}}_{\text{M1}} + \underbrace{\mathbf{\nabla}\cdot(\rho u_i \mathbf{u})  }_{\text{M2}} = \underbrace{\rho F_i}_{\text{F1}} - \underbrace{\mathbf{\nabla}\cdot(p \mathbf{I}_i)}_{\text{F2}},
\end{equation*}
$$
while notations being used are: $u_i$ - velocity component ($u_i \in \{u,v,w\}$); $p$ - pressure; $F_{i}$ - unit body acceleration; $\mathbf{I}_i$ - $i$th column of the identity matrix. Various terms are labeled as: $\textnormal{M1}$ - independent momentum change at a point in space; $\textnormal{M2}$ - momentum advection to and from the surroundings, similar intuition to the term $\textnormal{D2}$ in the density equation; $\textnormal{F1}$ - body force (such as weight); and $\textnormal{F2}$ - pressure gradient force.

By assuming a null body force, rearrange to obtain the momentum equation as:
$$
\begin{equation*}
\frac{\partial (\rho u_i)}{\partial t} + \mathbf{\nabla}\cdot(\rho u_i \mathbf{u} + p \mathbf{I}_i)) = 0,
\end{equation*}
$$
or more compactly using $\otimes$ as the vector product operator:
$$
\begin{equation*}
\frac{\partial (\rho \mathbf{u})}{\partial t} + \mathbf{\nabla}\cdot(\rho \mathbf{u} \otimes \mathbf{u}^T + p \mathbf{I})) = 0.
\end{equation*}
$$

A quick callback at this moment, we have the following two equations modelling density and momentum change:
$$
\left\{
\begin{align*}
\frac{\partial \rho}{\partial t} + \mathbf{\nabla}\cdot(\rho\mathbf{u}) &= 0\\
\frac{\partial (\rho \mathbf{u})}{\partial t} + \mathbf{\nabla}\cdot(\rho \mathbf{u} \otimes \mathbf{u}^T + p \mathbf{I}_i)) &= 0.
\end{align*}
\right.
$$

Sharp eyes will quickly see that there are 3 fluid variable attributes ($\rho, \rho\mathbf{u}, p$) in only 2 equations! Since we have density ($\rho$) and momentum ($\rho\mathbf{u}$), an intuitive next step is to introduce total energy ($E$) as a sum of kinetic energy and internal energy:
$$
E = \rho\left( \frac{1}{2}\mathbf{u}\cdot\mathbf{u} + e \right),
$$
where $e$ is the specific internal energy of fluid. To close the system, we assume the subject fluid is an ideal gas with the law quoted:
$$
p\frac{1}{\rho}=RT,
$$
where $1/\rho$ is the specific volume, $R$ is the ideal gas constant scaled to the number of moles of gas in the specific volume, and $T$ is temperature.

By further assuming that the gas is calorically ideal, that means all of its internal energy is stored as temperature (average kinetic energy of gas molecule), a linear relation that corrects $1/R$ into $1/(\gamma-1)$ can be introduced:
$$
\begin{align*}
&T = \frac{1}{R}\frac{p}{\rho} \\
\implies &e = \frac{p}{\rho (\gamma -1)}, \\
\end{align*}
$$
where $\gamma$ is a constant that depends on the particular gas of interest. For a typical diatonic gas such as nitrogen, one would obtain $\gamma = 1.4$ if he/she dives deep into nitrogen's atomic symmetry as a molecule made of two atoms.

With some inspiration drawn from the first density equation, we can therefore write the energy equation down as:
$$
\begin{align*}
&\frac{\partial E}{\partial t} + \mathbf{u}\cdot\mathbf{\nabla}E
= -\underbrace{E\mathbf{\nabla}\cdot\mathbf{u}}_{\text{E1}} - \underbrace{\mathbf{\nabla}\cdot(p\mathbf{u})}_{\text{E2}} \\
\implies
&\frac{\partial E}{\partial t} +\mathbf{\nabla}\cdot(E\mathbf{u})+\mathbf{\nabla}\cdot(p\mathbf{u})=0 \\
\implies
&\frac{\partial E}{\partial t} +\mathbf{\nabla}\cdot((E+p)\mathbf{u})=0 \\
\end{align*}
$$
Notice that $\textnormal{E1}$ has the same implication as that in the density equation - as fluid accumulates, energy will be lin added up together. A new term $\textnormal{E2}$ is introduced as the spatial derivative of the rate of work done against pressure gradient force.

At this point, we have obtained a model that governs the dynamics of a compressible, inviscid, and calorically ideal gas:
$$
\left\{
\begin{align*}
\frac{\partial \rho}{\partial t} + \mathbf{\nabla}\cdot(\rho\mathbf{u}) &= 0\\
\frac{\partial (\rho \mathbf{u})}{\partial t} + \mathbf{\nabla}\cdot(\rho \mathbf{u} \otimes \mathbf{u}^T + p \mathbf{I})) &= 0\\
\frac{\partial E}{\partial t} +\mathbf{\nabla}\cdot((E+p)\mathbf{u})=0,
\end{align*}
\right.
$$
with pressure being a function of the 3 conserved physical attributes, while $\gamma = 1.4$ for the very abundant nitrogen gas:
$$
p(\rho,\rho\mathbf{u},E) = \rho(\gamma - 1)\left( \frac{E}{\rho} - \frac{1}{2}\mathbf{u}\cdot\mathbf{u} \right).
$$

"This is indeed quite a journey from that first little whorl... 🥵"
--- a guy named Zian Huang

## 2. How do we solve the model we have just prepared for ourselves?

Now on our left hand, we have a domain made of boxes, each containing a prescribed set of fluid attributes (density, momentum, and total energy) as an initial condition. On our right hand, we have the system of equations modelling these attributes. In this chapter, our goal is to fuse them together: to discretise the governing equations and fit it to our Minecraft fluid space.

### Deeper dive into control volume and the finite volume method

Conservation is a great deal in physics, and we have also deliberately emphasised it in our momentum equation. The central philosophy that we would apply on each discrete box is:
**(1) Within a control volume, any variation tendency in conserved fluid attribute should be equal to the flux of that attribute leaving or entering the space**.

Another important constraint is that:
**(2) Each control volume should be viewed as a distinct entity when compared with other grid boxes, and as a unity of its continuous location points being contained**.

It is from **(2)** that we can consider any value contained in a box to be *piece-wise-linear* and uniformly distributed: the same set of conservative attributes would represent all locations in that box.

This is seen as a compromise we need to bear for trying to model our mother nature in a computer. We then need to alter our continuous equations into a weaker and less general volume-integral form. Take the density equation as an example:
![](/blogs/01_intro_to_cfd_compressible/finite_volume_integration.png)

We then consider the divergence theorem: $\iiint_{\textnormal{CV}} (\nabla \cdot \mathbf{F}) \, dV = \iint_{\textnormal{S}} \mathbf{F} \cdot d\mathbf{S}$, where $\mathbf{F}$ is a vector field and $\textnormal{S}$ is the surface of control volume (6 sides of the unit box), we have the density equation being applied on our discretised grids as:
$$
\begin{align*}
\iiint_{\textnormal{CV}} \left( \frac{\partial \rho}{\partial t} + \mathbf{\nabla}\cdot(\rho\mathbf{u}) \right) \, dV = 0 \\
\iiint_{\textnormal{CV}} \frac{\partial \rho}{\partial t} dV + \iint_{\textnormal{S}} \rho\mathbf{u} \cdot d\mathbf{S} = 0.
\end{align*}
$$
Notice that in the term $\mathbf{u}\cdot d \mathbf{S}$, since the velocity unit vectors are defined in the same direction as the grid axes, which are perpendicular their corresponding surface face, we can later see that this vector dot product can be reduced into scalar multiplication. The two terms, ($\iiint_{\textnormal{CV}} \frac{\partial \rho}{\partial t} dV$ and $\iint_{\textnormal{S}} \rho\mathbf{u} \cdot d\mathbf{S} = 0$), echo **(1)** with the later being the flux applied on the volume surface.

The above process of generalising continuous field values within some volume into a single representative, and then introduce conservation by emphasising the flux of those values going in and out, forms the essence of the *finite volume method* in fluid dynamics.

Since a divergence term is present in all of the 3 fluid attribute equations, we can rewrite the continuous system from the above:
$$
\left\{
\begin{align*}
\frac{\partial \rho}{\partial t} + \mathbf{\nabla}\cdot(\rho\mathbf{u}) &= 0\\
\frac{\partial (\rho \mathbf{u})}{\partial t} + \mathbf{\nabla}\cdot(\rho \mathbf{u} \otimes \mathbf{u}^T + p \mathbf{I})) &= 0\\
\frac{\partial E}{\partial t} +\mathbf{\nabla}\cdot((E+p)\mathbf{u})=0,
\end{align*}
\right.
$$
into [1]:
$$
\begin{align*}
\mathbf{U}_t + \mathbf{\nabla}\cdot\Bigl( \mathbf{F}(\mathbf{U}),\ \mathbf{G}(\mathbf{U}),\ \mathbf{H}(\mathbf{U}) \Bigr) &= \mathbf{0}
\\ \\
\mathbf{U}_t + \mathbf{F}(\mathbf{U})_x + \mathbf{G}(\mathbf{U})_y + \mathbf{H}(\mathbf{U})_z &= \mathbf{0},
\end{align*}
$$
where
$$
\mathbf{U} = \begin{pmatrix} \rho \\ \rho u \\ \rho v \\ \rho w \\ E \end{pmatrix},
\mathbf{F} = \begin{pmatrix} \rho u \\ \rho u^2 + p \\ \rho uv \\ \rho uw \\ u(E+p) \end{pmatrix},
\mathbf{G} = \begin{pmatrix} \rho v \\ \rho uv \\ \rho v^2+p \\ \rho vw \\ v(E+p) \end{pmatrix},
\mathbf{H} = \begin{pmatrix} \rho w \\ \rho uw \\ \rho vw \\ \rho w^2+p \\ w(E+p) \end{pmatrix},
$$
$$
p(\mathbf{U}) = \rho(\gamma - 1)\left( \frac{E}{\rho} - \frac{1}{2}(u^2+v^2+w^2) \right).
$$

Consider the following notation on a control volume with the location index $(i,j,k)$ at the centre of the discrete box:
![](/blogs/01_intro_to_cfd_compressible/univolume_centerandneighbor.png "width=500")

If we see the brick colour cube as the control volume to be integrated, apply finite volume discretisation and we would obtain:
$$
\begin{align*}
\iiint_{\textnormal{CV}} \mathbf{U}_t \, dV + \iint_{\textnormal{S}} \Bigl( \mathbf{F}(\mathbf{U}),\ \mathbf{G}(\mathbf{U}),\ \mathbf{H}(\mathbf{U}) \Bigr) \cdot d\mathbf{S} &= \mathbf{0} \\
\\
\iiint_{\textnormal{CV}} \mathbf{U}_t \, dV + \iint_{\textnormal{S}} \mathbf{F}(\mathbf{U}) d{\textnormal{S}_{yz}} + \iint_{\textnormal{S}} \mathbf{G}(\mathbf{U}) d{\textnormal{S}}_{xz} + \iint_{\textnormal{S}} \mathbf{H}(\mathbf{U}) d{\textnormal{S}_{xy}} &= \mathbf{0}\\
\\
\iiint_{\textnormal{CV}} \frac{\partial \mathbf{U}_{i,j,k}}{\partial t} \, dV
+ \iint_{\textnormal{S}} \mathbf{F}_{i+\frac{1}{2},j,k} d{\textnormal{S}_{1}} + \iint_{\textnormal{S}} -\mathbf{F}_{i-\frac{1}{2},j,k} d{\textnormal{S}_{6}} \\
+ \iint_{\textnormal{S}} \mathbf{G}_{i,j+\frac{1}{2},k} d{\textnormal{S}_{2}} + \iint_{\textnormal{S}} -\mathbf{G}_{i,j-\frac{1}{2},k} d{\textnormal{S}_{5}} \\
+ \iint_{\textnormal{S}} \mathbf{H}_{i,j,k+\frac{1}{2}} d{\textnormal{S}_{3}} + \iint_{\textnormal{S}} -\mathbf{H}_{i,j,k-\frac{1}{2}} d{\textnormal{S}_{4}}
&= \mathbf{0}, \\
\end{align*}
$$
and by adopting the first-order-upwind scheme in time discretisation, and the symmetry of fluid attributes on cube faces, we have:
$$
\begin{align*}
\frac{\Delta \mathbf{U}_{i,j,k}}{\Delta t} \Delta x \Delta y \Delta z
+ \mathbf{F}_{i+\frac{1}{2},j,k} \Delta y \Delta z - \mathbf{F}_{i-\frac{1}{2},j,k} \Delta y \Delta z \\
+ \mathbf{G}_{i,j+\frac{1}{2},k} \Delta x \Delta z -\mathbf{G}_{i,j-\frac{1}{2},k} \Delta x \Delta z 
+ \mathbf{H}_{i,j,k+\frac{1}{2}} \Delta x \Delta y -\mathbf{H}_{i,j,k-\frac{1}{2}} x \Delta y
&= \mathbf{0} \\ \\
\frac{\mathbf{U}^{n+1}_{i,j,k}-\mathbf{U}^{n}_{i,j,k}}{\Delta t}
+ \frac{1}{\Delta x}\left(\mathbf{F}_{i+\frac{1}{2},j,k} - \mathbf{F}_{i-\frac{1}{2},j,k}\right) \\
+ \frac{1}{\Delta y}\left(\mathbf{G}_{i,j+\frac{1}{2},k} - \mathbf{G}_{i,j-\frac{1}{2},k}\right) 
+ \frac{1}{\Delta z}\left(\mathbf{H}_{i,j,k+\frac{1}{2}} - \mathbf{H}_{i,j,k-\frac{1}{2}}\right) &= \mathbf{0} \\ \\
\implies
\mathbf{U}^{n+1}_{i,j,k}=\mathbf{U}^{n}_{i,j,k}
- \frac{\Delta t}{\Delta x}\left(\mathbf{F}_{i+\frac{1}{2},j,k} - \mathbf{F}_{i-\frac{1}{2},j,k}\right) \\
- \frac{\Delta t}{\Delta y}\left(\mathbf{G}_{i,j+\frac{1}{2},k} - \mathbf{G}_{i,j-\frac{1}{2},k}\right)
- \frac{\Delta t}{\Delta z}\left(\mathbf{H}_{i,j,k+\frac{1}{2}} - \mathbf{H}_{i,j,k-\frac{1}{2}}\right), \\
\end{align*}
$$
where a new superscript time notion is being introduced: $\mathbf{U}^{n+1}$ indicates a future state of fluid attributes at the targeted next time step $t_{\textnormal{future}} = t_{\textnormal{current}} + \Delta t$. This is complemented by  $\mathbf{U}^{n}$ as the current state.

There is one constraint applied on the chosen discrete time step -  the CFL (Courant-Friedrichs-Lewy) number, which is a constant used to parameterise the stability and diffusivity of a numerical configuration:
$$
\text{CFL} = \Delta t \left( \frac{|u|}{\Delta x} + \frac{|v|}{\Delta y} + \frac{|w|}{\Delta z} \right) \leq \text{CFL}_{\text{max}},
$$
where the maximum value of the CFL number should depend on the numerical scheme being used. In our case of simple first-order scheme, $\text{CFL} \leq 1$ would give us stable solution. Using a high CFL number would raise the sharpness solution that any discontinuity in attribute field would diffuse more slowly as time flows.

In the above discretised governing equations, we see that the term of our core interest: state of a fluid volume at a $\Delta t$ future time $\mathbf{U}^{n+1}_{i,j,k}$, can be determined by its current state $\mathbf{U}^{n}$, if and only if we can accurately capture the flux terms ($\mathbf{F}_{i\pm\frac{1}{2},j,k}$, $\mathbf{G}_{i,j\pm\frac{1}{2},k}$, $\mathbf{H}_{i,j,k\pm\frac{1}{2}}$) on the surface of control volume.

### Gatekeeper - the Riemann problem

We are only one step away from obtaining the discrete evolution equation. The last objective is to have the flux terms ($\mathbf{F}_{i\pm\frac{1}{2},j,k}$, $\mathbf{G}_{i,j\pm\frac{1}{2},k}$, $\mathbf{H}_{i,j,k\pm\frac{1}{2}}$) as functions of the current state of fluid domain $\mathbf{U}^n$. Consider the red-colour highlighted face boundary between 2 control volumes in the following setting:
![](/blogs/01_intro_to_cfd_compressible/boundary.png "width=500")
By temperately dropping the $y$ and $z$ components to solely focus on the x-direction, we can obtain the following graph. This clearly illustrates a big consequence of us adopting an uniform configuration for fluid attributes - discontinuity at the half step boundary!
![](/blogs/01_intro_to_cfd_compressible/boundary_graph.png "width=600")
This sharp jump in fluid attributes puts a big problem to our wish writing down $\mathbf{F}_{i+\frac{1}{2},j,k}=\mathbf{F}(\mathbf{U}_{i+\frac{1}{2},j,k})$. Instead, we should aim for $\mathbf{F}_{i+\frac{1}{2},j,k}=\mathbf{F}(\mathbf{U}_{i,j,k},\mathbf{U}_{i+1,j,k})$, or for . This is known as the **Riemann problem**, named after Bernhard Riemann who was the first scholar addressing it.

To first tackle the above one-dimensional simple case, it is possible to write as the flux as a function of left and right states of attributes - $\mathbf{F}_{i+\frac{1}{2}}(\mathbf{U}_{L},\mathbf{U}_{R})$, with $\mathbf{U}_{L}=\mathbf{U}_{i,j,k}$ and $\mathbf{U}_{R}=\mathbf{U}_{i+1,j,k}$.

A simple approximate solution is the Lax-Friedrichs flux:
$$
\mathbf{F}_{i+\frac{1}{2}}(\mathbf{U}_{L},\mathbf{U}_{R}) = \underbrace{\frac{1}{2} \left( \mathbf{F}(\mathbf{U}_L) + \mathbf{F}(\mathbf{U}_R) \right)}_{\text{F1}} - \underbrace{\frac{1}{2} S_{\text{max}} \left( \mathbf{U}_R - \mathbf{U}_L \right)}_{\text{F2}},
$$
with
$$
\begin{align*}
S_{\text{max}} &= \max(|u_L| + c_L, |u_R| + c_R)\\
c &= \sqrt{\gamma p / \rho},
\end{align*}
$$
where $\text{F1}$ is simply an average of the x-direction flux in both the left and right control volumes. $\text{F2}$ is a crucial stabilising term. It accounts for the average of the sharp jump in discontinuity ($\mathbf{U}_R - \mathbf{U}_L$), advected by the movement of discontinuity (speed being the sum of flow velocity, $u$, and the speed of sound of that fluid, $c$).

One should easily get the remaining $\mathbf{G}_{i,j\pm\frac{1}{2},k}$ and $\mathbf{H}_{i,j,k\pm\frac{1}{2}}$ by consider symmetry, and complete our quest to model the compressible inviscid fluid.

The work of solving the Riemann problem efficiently with high order of accuracy remains to be an active field of research. For those curious minds wanting more than this intuitive but less impressive approximation, let's watch the approximated solution to a typical Riemann problem.

With a tweak of variable, density ($\rho$), velocity ($\mathbf{u}$), and pressure ($p$) are more widely considered as the primary set of attributes in experimental work. This is due to the ease of measurement and reproducibility in setting up the initial conditions of a fluid field. The solution to the Riemann problem would have the following schematic features:
![](/blogs/01_intro_to_cfd_compressible/solution_animation.gif "width=600")


The essence of this animated solution is to emphasise these 3 moving characteristics as the system evolves:
![](/blogs/01_intro_to_cfd_compressible/screenshot_solution_animation.png "width=600")
The motion and corresponding locations about $x_{x+1/2}$ of these 3 characteristics form the key basis for you to dive deeper into some more sophisticated solvers. Prof. Toro's book [1] would be a very complete guide to further support you journey 👍

## We have come a long way from the first little whorls, even without viscosity

If you have read for this long till the very end. My thanks! And I hope you have been a bit more knowledgeable and interested in the art of fluid modelling. Lastly, I wish to point out some of the other paths we have missed in the following roadmap of computational fluid dynamics. Some of the choices and assumptions we have made are modular, meaning that one can switch to a more sophisticated numerical method and enjoy a high order of accuracy. Others are rabbit holes that would require completely new ways of analysis, such as the viscous incompressible flow.

![](/blogs/01_intro_to_cfd_compressible/roadmap.png "width=600")

Bon voyage in your fluid modelling quest ⛵


## Reference

[1] E. F. Toro, _Riemann Solvers and Numerical Methods for Fluid Dynamics: A Practical Introduction_. Berlin, Heidelberg: Springer, 2009. doi: [10.1007/b79761](https://doi.org/10.1007/b79761).

[2] Jacob Albright, _Flow Visualization in a Water Channel_, (Nov. 20, 2017). [Online Video]. Available: [https://www.youtube.com/watch?v=30_aADFVL9M](https://www.youtube.com/watch?v=30_aADFVL9M)

[3] J. H. Ferziger, M. Perić, and R. L. Street, “Basic Concepts of Fluid Flow,” in _Computational Methods for Fluid Dynamics_, J. H. Ferziger, M. Perić, and R. L. Street, Eds., Cham: Springer International Publishing, 2020, pp. 1–21. doi: [10.1007/978-3-319-99693-6_1](https://doi.org/10.1007/978-3-319-99693-6_1).