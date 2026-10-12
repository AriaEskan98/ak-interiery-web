# Media pending confirmation – NOT published, NOT part of the build

`videos/REALIZACE_01_VIDEO_01.mp4` – a DIFFERENT kitchen (geometric light ceiling), not "Moderní kuchyně s kamenným ostrůvkem".
`videos/REALIZACE_01_VIDEO_02.mp4` – a TV wall.

Per AK_INTERIERY_REALIZACE_MEDIA_WEBAR (section 07): keep unpublished until AK confirms which projects they show, that
they are AK work, and the scope. To publish later: create a project in `src/realizace.js` (or add to an existing one),
copy the video to `public/realizace/<slug>/`, and add a `{ type: 'video', src, poster }` media item.
