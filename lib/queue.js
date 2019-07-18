'use strict';

function generateID()
{
	return (new Date()).getTime() * 100 + Math.floor( Math.random() * 100 );
}

const Queue = module.exports = class Queue
{
    static s_modals = [];
    static s_active_modal_id = null;

    static showModal( show, flow_id = undefined )
	{
		try
		{
			if( !Queue.s_active_modal_id )
			{
				show( Queue.s_active_modal_id = generateID() );
			}
			else
			{
				Queue.s_modals.push({ show, flow_id });
			}
		}
		catch(e){ console.log( e ); }
	}

	static onModalClosed( id )
	{
		try
		{
			if( id === Queue.s_active_modal_id )
			{
				let next_modal = Queue.s_modals.shift();

				if( next_modal )
				{
                    Queue.s_active_modal_id = generateID();
                    
                    setTimeout(() => next_modal.show( Queue.s_active_modal_id ), 1000);
				}
				else{ Queue.s_active_modal_id = null; }
			}
			else
			{
                console.log('Invalid modal id');
			}
		}
		catch(e){ console.log( e ); }
	}

	static cancelModals( flow_id = null )
	{
		try
		{
			for( let i = 0; i < Queue.s_modals.length; ++i )
			{
				if( flow_id === null || Queue.s_modals[i].flow_id === flow_id )
				{
					Queue.s_modals( i--, 1 );
				}
			}
		}
		catch(e){ console.log( e ); }
    }
};