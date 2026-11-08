/* The Way — Service. After the Seven are chosen, the scribe serves with Stephen: listening, caring, praying.
   Outcomes are honest: some are healed, some recover slowly, some find comfort, and one dies in peace.
   The player's choices shape how well he serves, never whether God answers. Prayers quote Scripture word for word. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, D = TW.D, AU = () => TW.Audio;
  const R = K.R;

  D.service = {
    miriam: {
      title: 'Miriam of Alexandria', person: 'Miriam', set: 'house', time: 'day', after: 'seven', region: 'jerusalem', place: 'upperroom',
      look: { skin: '#a8724a', hair: '#9a9288', tunic: '#5a4a3a', veil: '#7a6a5a' }, pose: 'sit',
      intro: [['n', 'Stephen sends you with bread and oil to a widow from Alexandria who lives alone in two rooms near the Fish Gate. She speaks Greek. You speak it badly.'], ['h', 'Widows without sons or brothers had almost no way to earn a living. The believers’ daily distribution was meant to reach every one of them (Acts 4:34).']],
      listen: { prompt: 'She sits very straight and waits for you to speak.', options: [
        ['Ask about her husband.', ['d', 'He was a dyer in Alexandria. We came up for the feast when he was already old, and he died here. I never went back.']],
        ['Ask whether she has eaten.', ['d', 'Yesterday. A little. Do not trouble yourself.']],
        ['Say nothing. Just sit with her.', ['n', 'After a while she begins to talk on her own, about the harbor at Alexandria and a lighthouse taller than the Temple.']],
      ] },
      care: { prompt: 'You have bread, oil, and the rest of the afternoon.', options: [
        ['Leave the bread and oil on her shelf and go.', ['n', 'She thanks you at the door. The rooms are very quiet when you leave.']],
        ['Bake the bread with her and eat together.', ['n', 'You eat together on the floor. She corrects your Greek, and laughs for the first time.']],
        ['Promise to come tomorrow, and write her name on Stephen’s list.', ['n', 'You write MIRIAM OF ALEXANDRIA in your best hand. She watches you do it as if it were a deed to land.']],
      ] },
      pray: { prompt: 'Before you go, you pray with her.', options: [
        ['Pray the words Jesus gave in the upper room.', [['s', 'john14', '14:27', '14:27']]],
        ['Pray in your own words, in bad Greek.', [['n', 'You stumble through a prayer in Greek. Halfway through she takes over and finishes it for you.']]],
      ] },
      outcome: { anim: 'none', blocks: [['n', 'Nothing miraculous happens in Miriam’s two rooms. A widow eats, and she is not alone. Stephen says that is what the Seven were chosen for.']] },
      log: 'Miriam of Alexandria: bread and oil, and a name on the list. She is not alone.',
    },
    hannah: {
      title: 'The carpenter’s daughter', person: 'Hannah', set: 'house', time: 'night', after: 'seven', region: 'jerusalem', place: 'upperroom',
      look: { skin: '#b8845a', hair: '#2a1a12', beard: '#b8845a', tunic: '#e6dcc4' }, pose: 'lie', family: true,
      intro: [['n', 'Past midnight, a carpenter named Shimon pounds on your door. His daughter has burned with fever for three days. He heard the believers pray for the sick.'], ['h', 'Fevers killed many children in the ancient world, and physicians could do little to stop them.']],
      listen: { prompt: 'The room smells of sweat and lamp oil.', options: [
        ['Ask the father how long she has been sick.', ['d', 'Three days. She stopped eating yesterday. Today she stopped knowing us.', 'Shimon']],
        ['Ask the mother what she has tried.', ['d', 'Everything. Cold cloths. Prayers. The physician took our money and left.', 'Her mother']],
        ['Kneel by the girl and listen to her breathing.', ['n', 'Her breath is quick and shallow. She is very small under the blanket.']],
      ] },
      care: { prompt: 'What do you do first?', options: [
        ['Bathe her forehead with cool water.', ['n', 'You wring out the cloth again and again. Her skin is hot as a baking stone.']],
        ['Send the father for Stephen.', ['n', 'Stephen comes before the second watch, still wearing his work clothes, and kneels on the other side of the mat.']],
        ['Make the mother eat something.', ['n', 'She has not eaten either. You put bread in her hands and hold them until she does.']],
      ] },
      pray: { prompt: 'You pray for the girl.', options: [
        ['Pray the words Jesus spoke about children.', [['s', 'mark10c', '10:14', '10:16']]],
        ['Pray the believers’ prayer from the day of the council.', [['s', 'acts4', '4:29', '4:30']]],
        ['Pray in the name of Jesus Christ of Nazareth, in your own words.', [['n', 'In the name of Jesus Christ of Nazareth you ask the Father to let her live. It is a short prayer. You say it many times.']]],
      ] },
      outcome: { anim: 'rise', blocks: [
        ['n', 'Nothing changes at once. You keep watch with the parents until the lamp burns low.'],
        ['c', 'rise'],
        ['n', 'Toward dawn the girl’s skin cools. She opens her eyes and asks for water. By midday she is eating bread with honey, and her father cannot stop weeping.'],
      ] },
      log: 'Hannah, the carpenter’s daughter: we prayed in Jesus’ name and kept watch. Toward dawn the fever broke.',
    },
    yosef: {
      title: 'Yosef the potter', person: 'Yosef', set: 'house', time: 'night', after: 'seven', region: 'jerusalem', place: 'upperroom',
      look: { skin: '#a8724a', hair: '#c8c0b4', beard: '#d8d0c4', tunic: '#cdbb94' }, pose: 'lie', family: true,
      intro: [['n', 'Yosef heard Peter at Pentecost and was baptized at eighty. Now he is dying, and he has asked for “the scribe who writes things down.”']],
      listen: { prompt: 'He takes your hand. His grip is still strong from sixty years at the wheel.', options: [
        ['Ask what he wants you to write.', ['d', 'That I was there. That I heard Peter. That I believed. My grandsons should know it.']],
        ['Ask if he is afraid.', ['d', 'Of dying? A little. Of what comes after? Not since Pentecost.']],
        ['Ask about his life.', ['d', 'Eighty years of pots. I made the water jars for half the weddings on this street.']],
      ] },
      care: { prompt: 'What do you do for him?', options: [
        ['Write down his testimony for his grandsons.', ['n', 'You write slowly, in your best hand. He makes you read it back to him twice, and corrects one word.']],
        ['Wet his lips and ease his pillow.', ['n', 'He sighs and closes his eyes. For a while the cough lets him rest.']],
        ['Send for his family.', ['n', 'His daughter comes, and three grandsons who stand very still in the doorway.']],
      ] },
      pray: { prompt: 'You pray with him.', options: [
        ['Pray the words Jesus spoke to Martha.', [['s', 'john11', '11:25', '11:26']]],
        ['Pray the words from the upper room.', [['s', 'john14', '14:1', '14:3']]],
        ['Ask the Lord to heal him.', [['n', 'You pray that he will rise from this bed. When you finish he pats your hand.'], ['d', 'Son, I am eighty-one.']]],
      ] },
      outcome: { anim: 'peace', blocks: [
        ['n', 'Yosef dies a little before dawn, with his daughter’s hand in his and your scroll on the blanket.'],
        ['c', 'peace'],
        ['n', 'There is no miracle in the room. There is no fear in it either.'],
        ['d', 'We asked the Lord to heal him. He took him home instead. The grief is ours to carry now, not his.', 'Stephen'],
      ] },
      log: 'Yosef the potter: I wrote down his testimony for his grandsons. He died at dawn, unafraid.',
    },
    eli: {
      title: 'A young man in the Kidron tombs', person: 'Eli', set: 'gate', time: 'dusk', after: 'seven', region: 'jerusalem', place: 'gethsemane',
      look: { skin: '#9a6440', hair: '#1e1410', tunic: '#6f6250' }, pose: 'wild', withStephen: true,
      intro: [['n', 'Stephen takes you outside the walls to the tombs in the Kidron Valley. The neighbors of a young man named Eli have chained him there. They say he screams through the night and knows no one.'], ['h', 'Acts records unclean spirits driven out in Jesus’ name (Acts 5:16, 8:7). It also warns that his name is not a spell for anyone to use (19:13–16).']],
      listen: { prompt: 'Eli pulls against the chain and shouts at the sky.', options: [
        ['Ask his mother when it began.', ['d', 'When he was a boy. It comes and goes. Lately it never goes.', 'His mother']],
        ['Ask Eli his name.', ['n', 'He stares at you a long time. “Eli,” he says at last, in a small voice. Then the shouting starts again.']],
        ['Watch Stephen.', ['n', 'Stephen does not shout. He kneels in the dirt at the end of the chain and waits.']],
      ] },
      care: { prompt: 'What do you do?', options: [
        ['Bring him water.', ['n', 'He knocks the cup away twice. The third time he drinks.']],
        ['Ask the neighbors to unchain him.', ['n', 'They refuse, then argue, then one of them puts the key in your hand.']],
        ['Fast and pray with Stephen through the night.', ['n', 'You do not eat. The night is cold and long, and Stephen prays more than he speaks.']],
      ] },
      pray: { prompt: 'Stephen looks at you. It is time to pray.', options: [
        ['Pray with Stephen in the name of Jesus Christ of Nazareth.', [['n', 'Stephen speaks quietly and firmly. In the name of Jesus Christ of Nazareth he commands the unclean spirit to leave the boy. You pray with him, under your breath, again and again.']]],
        ['Pray the father’s prayer from the Gospel.', [['s', 'mark9b', '9:23', '9:24']]],
      ] },
      outcome: { anim: 'calm', blocks: [
        ['c', 'calm'],
        ['n', 'There is a long cry, and then silence. Eli falls asleep in the dirt with his head on his mother’s knee.'],
        ['s', 'mark9b', '9:29', '9:29'],
        ['n', 'It is not finished in one night. For weeks his mother brings him to the breaking of bread, and some days are hard. By the Feast of Tabernacles he is carrying water for the widows.'],
      ] },
      log: 'Eli of the Kidron tombs: we prayed with Stephen in Jesus’ name. He was freed, though healing took weeks.',
    },
    tobiah: {
      title: 'Tobiah at the gate', person: 'Tobiah', set: 'court', time: 'day', after: 'seven', region: 'jerusalem', place: 'temple',
      look: { skin: '#8a5636', hair: '#2a1a12', beard: '#2a1a12', tunic: '#8a7a5a' }, pose: 'sit',
      intro: [['n', 'A blind man begs at the same Temple gate where the lame man used to sit. He has heard what happened there, and he asks the believers to pray for him.']],
      listen: { prompt: 'He turns his face toward your voice.', options: [
        ['Ask how he lost his sight.', ['d', 'Stone dust and a falling block at the quarry, four years ago. I was a cutter. Now I am a beggar.']],
        ['Ask what he wants.', ['d', 'To see. And if not that, to stop being invisible.']],
        ['Ask where he sleeps.', ['d', 'Wherever the night finds me. Usually against this wall.']],
      ] },
      care: { prompt: 'What do you do for him?', options: [
        ['Lead him to the breaking of bread tonight.', ['n', 'He holds your arm all the way across the city. At the house forty people make room for him.']],
        ['Find him a place to sleep in a believer’s house.', ['n', 'A tanner’s family gives him a mat by the oven. He says it is the warmest he has been in four years.']],
        ['Give him your cloak.', ['n', 'He runs his fingers along the fringes and laughs. “A scribe’s cloak, on a quarryman.”']],
      ] },
      pray: { prompt: 'He asks you to pray for his eyes.', options: [
        ['Pray in the name of Jesus Christ of Nazareth for his sight.', [['n', 'You put your hands over his eyes and pray, as Peter prayed at the gate, in the name of Jesus Christ of Nazareth.']]],
        ['Pray as the leper asked: “If you want to, you can make me clean.”', [['s', 'mark1c', '1:41', '1:41']]],
      ] },
      outcome: { anim: 'walk', blocks: [
        ['n', 'Nothing happens to his eyes. You pray again the next day, and the next week. They stay dark.'],
        ['c', 'walk'],
        ['d', 'I still can’t see. But I eat with forty people every night, and they all know my name. I was invisible, scribe. Now I’m not.'],
        ['n', 'You write it down honestly. Not every prayer is answered the way you ask it.'],
      ] },
      log: 'Tobiah the quarryman: we prayed for his sight, and his eyes stayed dark. He has a family now, and a place at the table.',
    },
  };

  // ---------- the visit ----------
  function stageFor(v) {
    if (v.set === 'court') { const st = K.courtStage(false); st.audio = { music: 'reflect', amb: { crowd: 0.4, city: 0.5, doves: 0.4 } }; return st; }
    if (v.set === 'gate') {
      const st = { width: 320, audio: { music: 'tension', amb: { wind: 0.6, night: 0.3 } }, bg(ctx, t, cam) { ctx.drawImage(K.gateArt(), -cam, 0); } };
      return K.nightWrap(st, { dark: 0.35, lights: [{ x: 230, y: 130, r: 46, c: 'rgba(255,160,80,0.4)' }] });
    }
    const st = K.interiorStage();
    if (v.time === 'night') { K.nightWrap(st, { dark: 0.3, lights: [{ x: 168, y: 95, r: 54 }, { x: 128, y: 136, r: 40, c: 'rgba(255,170,90,0.35)' }] }); st.audio = { music: 'night', amb: { room: 0.5, night: 0.4 } }; }
    else st.audio = { music: 'reflect', amb: { room: 0.5, crowd: 0.1 } };
    return st;
  }

  const run = async function (game, id) {
    const V = D.service[id], P0 = K.sprites();
    SC.load(stageFor(V)); SC.cam = V.set === 'gate' ? 64 : V.set === 'court' ? 64 : 0; SC.camGoal = SC.cam;
    const ground = V.set === 'court' ? 127 : 147;
    let lying = null, person = null;
    const px = V.set === 'court' ? 214 : V.set === 'gate' ? 236 : 128;
    if (V.pose === 'lie') {
      const spr = S.lying(V.look);
      lying = SC.add({ x: px, y: ground, z: ground - 1, draw(ctx, sx, sy) { ctx.drawImage(spr, sx - 14, sy - 10); } });
    } else {
      person = SC.add({ frames: V.pose === 'wild' ? S.wildman() : S.person(V.look), x: px, y: ground + (V.set === 'court' ? 0 : 1), pose: V.pose === 'wild' ? 'raise' : 'sit', facing: -1, hopping: V.pose === 'wild' });
    }
    const fam = [];
    if (V.family) fam.push(SC.add({ frames: K.villager(1200 + id.length), x: px + 28, y: ground, pose: 'sit', facing: -1 }), SC.add({ frames: K.villager(1210 + id.length, true), x: px + 42, y: ground + 1, pose: 'sit', facing: -1 }));
    if (V.pose === 'wild') fam.push(SC.add({ frames: K.villager(1220, true), x: px + 30, y: ground, facing: -1 }));
    const stephen = SC.add({ frames: K.who('stephen'), x: px - 40, y: ground, facing: 1, visible: !!V.withStephen || id === 'hannah' });
    if (id === 'hannah') stephen.visible = false;
    const me = SC.add({ id: 'player', frames: P0.player, x: px - 22, y: ground + 1, facing: 1, pose: V.pose === 'lie' || V.pose === 'sit' ? 'sit' : 'stand' });
    void me;
    const name = V.person;
    const say = async (b) => {
      if (b[0] === 's') await SC.say({ kind: 'scripture', ref: P.ref(b[1], b[2], b[3]), text: P.vs(b[1], b[2], b[3]) });
      else if (b[0] === 'd') await SC.say({ kind: 'drama', speaker: b[2] || name, text: b[1] });
      else if (b[0] === 'h') await SC.say({ kind: 'history', text: b[1] });
      else await SC.say({ kind: 'drama', text: b[1] });
    };
    const anims = {
      rise: async () => { if (lying) { SC.ents = SC.ents.filter((e) => e !== lying); person = SC.add({ frames: S.person(Object.assign({}, V.look, { beard: null })), x: px, y: ground, pose: 'sit', facing: -1 }); AU() && AU().music('wonder'); await SC.wait(900); fam.forEach((f) => { f.pose = 'raise'; }); } },
      peace: async () => { AU() && AU().music('silence'); await SC.wait(1400); AU() && AU().music('reflect'); },
      calm: async () => { if (person) { person.hopping = false; person.pose = 'sit'; } AU() && AU().music('reflect'); await SC.wait(1000); },
      walk: async () => { if (person) { person.pose = 'stand'; person.speed = 14; me.pose = 'stand'; await SC.walk(person, px - 50); } },
    };
    for (const b of V.intro) await say(b);
    const l = await SC.choose(V.listen.prompt, V.listen.options.map((o) => o[0]), 'Listen');
    await say(V.listen.options[l][1]);
    const c = await SC.choose(V.care.prompt, V.care.options.map((o) => o[0]), 'Care');
    if (id === 'hannah' && c === 1) stephen.visible = true;
    await say(V.care.options[c][1]);
    const p = await SC.choose(V.pray.prompt, V.pray.options.map((o) => o[0]), 'Pray');
    me.pose = me.pose === 'sit' ? 'sit' : 'raise';
    for (const b of V.pray.options[p][1]) await say(b);
    me.pose = V.pose === 'lie' || V.pose === 'sit' ? 'sit' : 'stand';
    for (const b of V.outcome.blocks) { if (b[0] === 'c') { if (anims[b[1]]) await anims[b[1]](); } else await say(b); }
    game.serve(id, { listen: V.listen.options[l][0], care: V.care.options[c][0], pray: V.pray.options[p][0] });
    await SC.prompt('Written in your scroll, under Service.', 'Back to the map', 'script');
    game.show('map');
  };

  TW.Service = { run };
})(window.TW);
