import daybookRouter from '@/modules/daybook/router'
describe('Tests in router module', () => {

  test('Router should have this config', async () => {
      expect(daybookRouter).toMatchObject({
            name: 'daybook',
            component: expect.any(Function),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any(Function),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any(Function),
                    props: expect.any(Function)
                }
            ]
        })
        // expect((await daybookRouter.children[0].component()).default.name).toBe('NoEntrySelected')
        // expect((await daybookRouter.children[1].component()).default.name).toBe('EntryView')
        const promisesRoutes = []
        daybookRouter.children.forEach(child => promisesRoutes.push(child.component()))
        const routes = (await Promise.all(promisesRoutes)).map(route => route.default.name)
        expect(routes).toContain('NoEntrySelected')
        expect(routes).toContain('EntryView')
  })

  test('should return the ID of the route', () => {
        const route = {
            params: {
                id: 'ABC-123'
            }
        }
        // expect(daybookRouter.children[1].props(route)).toEqual({id: 'ABC-123'})
        const entryRoute = daybookRouter.children.find(child => child.name === 'entry')
        expect(entryRoute.props(route)).toEqual({id: 'ABC-123'})
  })


})
