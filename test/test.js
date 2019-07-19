const Sleep = ( ms ) => new Promise( resolve => setTimeout( resolve, ms ));

const queue = require('../lib/queue');

describe( 'queue', async( done ) =>
{
    it('should init tests', async function()
	{
		queue.showModal( ( modal_id ) =>
        {
            queue.onModalClosed( modal_id );
        }, 1);

        await Sleep(500);
    });
    
    it('should do multiple modals', async function()
	{
		queue.showModal( async ( modal_id ) =>
        {
            await Sleep(300);
            queue.onModalClosed( modal_id );
        }, 1);

        queue.showModal( async ( modal_id2 ) =>
        {
            queue.onModalClosed( modal_id2 );
        }, 2);

        await Sleep(1000);
    });

    it('should test bad modal id', async function()
	{
		queue.showModal( async ( modal_id ) =>
        {
            queue.onModalClosed( 1 );
            await Sleep(500);
            queue.onModalClosed( modal_id );
        });

        await Sleep(1000);
    });
    
    it('should do cancel all modals', async function()
	{
		queue.showModal( async () =>
        {
            await Sleep(500);

            queue.cancelModals();
        });

        await Sleep(1000);
    });
    
    it('should do cancel flow modals', async function()
	{
		queue.showModal( async () =>
        {
            queue.cancelModals( 1 );
        }, 1);

        await Sleep(1000);
    });

    it('should do cancel multiple modals', async function()
	{
		queue.showModal( async () =>
        {
            queue.showModal( async () =>
            {
                await Sleep(500);

                queue.cancelModals();
            });
        });

        await Sleep(1000);
	});
    
    it('should do cancel multiple flow modals', async function()
	{
		queue.showModal( async () =>
        {
            queue.showModal( async () =>
            {
                await Sleep(500);
                
                queue.cancelModals( 1 );
            }, 1);
        }, 1);
	});
});