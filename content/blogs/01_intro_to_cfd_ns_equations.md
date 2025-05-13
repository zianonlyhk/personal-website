---
title: "Introduction to CFD: From F=ma to the Navier-Stokes"
date: "2024-13-32"
excerpt: "Please come back later... I am making the best use of my spare time on this..."
thumbnailUrl: "/under_construction.jpeg"
---

I can still remember when I was first studying Newtonian Mechanics back in secondary school, my neighbouring classmate would write $\mathbf{F}=m\mathbf{a}$ ($\textnormal{Force} = \textnormal{mass} \times \textnormal{acceleration}$) down in every single question right after the start of a test. Apparently this could give him a minimum of 1 mark (1M) if $\mathbf{F}=m\mathbf{a}$ was indeed the tool to use solving that question - a great example showing how this simple and yet powerful equation can help making people's (and Hong Kong students') lives easier.

I had been recalling this first glimpse of physics throughout my computational fluid dynamics (CFD) journey. Looking back, a guided tour going from $\mathbf{F}=m\mathbf{a}$ all the way to the Navier-Stokes equations sounds like a grateful finale to my pursue of fluid modelling and a salute to my student life.

Before we start talking in Greek alphabets, a great question to always ask is "what are we actually modelling". To illustrate this often skipped yet fundamental question, here is a typical secondary school physics problem the then 16-year-old me liked to spend time with:
![](/blogs/01_intro_to_cfd_ns_equations/dse_example_question.png "width=800")

In this case, we want to use $\mathbf{F}=m\mathbf{a}$ to govern our imaginary reality of trolley shooting. It is an obvious fact that the bullet being fired, and the trolley being hit, are the "players" of this equation we are interested in. Let's just call them "players" because they seem to comply with the rules we assign to them. They seem to be in the game.

For each "player", we are well aware of these granted-for-free qualities:
1. **It can be comfortably identified as an isolated object unity, capable of containing some subsidiary parts.**
2. **Any subsidiary of an object can comfortably share the same set of kinematic attributes as its parent unity.**

Get rid of the textbook tone and to apply the above on a trolley, we have:
1. When I say "trolley", you well understand what I am referring to, and you know that "trolley" would include the rollers, the container and the plasticine.
2. Those rollers, container, and plasticine, as part of that trolley, would actually move equally fast to the trolley itself in the same direction.

![](/blogs/01_intro_to_cfd_ns_equations/moving_trolley.png "width=300")

This obvious fact is pure BS! I have helped you to express your strong opinion so you don't need to make your mouth dirty. Things only become non-trivial when we change our focus to a fluid flow. Consider the following case:
![](/blogs/01_intro_to_cfd_ns_equations/shooting_trolley.png "width=300")

Here is a statement for our newly joined "player", a fluid to be modelled:
"My water stream hits the trolley, some of the flows go up, some of them go sideways and some of them fall onto the ground."

Things have become trickier to have a say! Let's go back to the earlier 2 granted qualities of rigid body mechanics, and apply them to our beloved fluid:
1. **It can be comfortably identified as an isolated object unity, capable of containing some subsidiary parts.**
	No, I can just see a chunk of fluid. Can't tell which part its head is and which its body is.
2. **Any subsidiary of an object can comfortably share the same set of kinematic attributes as its parent unity.**
	No, fluid streams are moving in different directions with different speed as they hit the trolley.

This unfortunate reality leads to a "dangerous" decision: To chop it into chunks and to see if each fluid piece can comply with our $\mathbf{F}=m\mathbf{a}$ model conditions.

A proposal is given as follows:
![](/blogs/01_intro_to_cfd_ns_equations/separating_fluid_into_chunks.png "width=500")
Under the game of $\mathbf{F}=m\mathbf{a}$, what we have done to the fluid is equivalent to considering a not-so-trustworthy trolley representative being made up of many individual trolleys!   

Why is it a dangerous decision? Because there exists a recursive question: "Sure I like your chopping skills, but why not smaller chunks? I see fluid eddies wriggling in this piece you've just given me. There is no way this is an unity like my favourite trolley" :(
![](/blogs/01_intro_to_cfd_ns_equations/fluid_butcher.png "width=500")

You can't win this challenge. Since we have already dissembled our fluid and can't go back, let's explore another possibility to comfort our tumbling heart: the concept of gridding.

Unlike the case of shooting trolley, our newly joined player does not move at all, at least for now.
[Butcher now chop things into small rectangular pieces]
[Studying fluid through the lens of a Cartesian grid]

We are now studying fluid through the lens of a rectangular grid ( a.k.a. Cartesian grid), but we do know that this is a compromise to our intuitive $\mathbf{F} = m\mathbf{a}$. Rather than focusing on the actual object, the "player" of the modelling rules, we are trying to apply this set of rules to a perspective. That's a totally different matter!

The consequence of this action is the introduction of material derivatives.