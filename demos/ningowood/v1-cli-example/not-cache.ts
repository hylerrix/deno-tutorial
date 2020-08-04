import { Controller, Get, Area, App } from 'https://deno.land/x/alosaur@v0.21.1/mod.ts';

@Controller() // or specific path @Controller("/home")
export class HomeController {
    @Get() // or specific path @Get("/hello")
    text() {
        return 'Hello world';
    }
}

// Declare module
@Area({
    controllers: [HomeController],
})
export class HomeArea {}

// Create alosaur application
const app = new App({
    areas: [HomeArea],
});

app.listen();