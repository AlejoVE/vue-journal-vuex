export default () => ({
     isLoading: true,
     entries: [
         {
             id: new Date().getTime(),
             date: new Date().toDateString(),
             picture: null,
             text:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum, neque et pulvinar maximus, velit neque condimentum metus, a laoreet nunc enim vitae dui. Quisque maximus velit a vulputate egestas. Integer cursus mattis molestie. Mauris gravida sed purus vel viverra. Donec mauris nisi, egestas placerat quam dapibus, lacinia semper mi. Vivamus aliquet aliquet mauris,',
         },
         {
             id: new Date().getTime() + 1000,
             date: new Date().toDateString(),
             picture: null,
             text:  'eu dignissim velit pharetra eu. Aenean lacinia ut nulla in elementum. Ut eget placerat libero, egestas ullamcorper nisi. Curabitur porttitor diam vel congue semper. Vestibulum accumsan, nisl at congue volutpat, ante elit pellentesque dui, a finibus turpis libero vitae nunc. Vivamus tempus consequat',
         },
         {
             id: new Date().getTime() + 2000,
             date: new Date().toDateString(),
             picture: null,
             text:  'In porttitor ornare diam, at tincidunt neque rutrum vel. Sed sed porta enim, id varius nunc. Phasellus tristique, nunc sit amet malesuada porta, felis diam iaculis sem, ultricies rutrum magna urna id enim. Morbi mi lacus, elementum lobortis fringilla non, rutrum ac mauris.',
         },
     ],
})