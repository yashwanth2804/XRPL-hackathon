/**
 * SignUp user cash back on first transaction
 *
 * yaswanth kambala
 * Date: 12 Dec 2022
 *
 **/

#include <stdint.h>
#include "hookapi.h" 

int64_t hook(uint32_t reserved)
{
    
     TRACESTR("Cashback: started");
    // before we start calling hook-api functions we should tell the hook how many tx we intend to create

    etxn_reserve(1);

    // get the account the hook is running on and the account that created the txn
    uint8_t hook_accid[20];
    hook_account(SBUF(hook_accid)); // hookid will have acc that has hook deployed

    // get originating tx addr
    uint8_t otxn_accid[20];
    int32_t otxn_accid_len = otxn_field(SBUF(otxn_accid), sfAccount);

    if (otxn_accid_len < 20)
        rollback(SBUF("Cashback : sfAccount field missing!!!"), 10);

    int8_t prevTxBuff[1];
    int64_t prevTx = state(SBUF(prevTxBuff), SBUF(otxn_accid));
    trace_num(SBUF("state_GET result <=== hook_accidXXXX :"), prevTx);
    if(prevTx == -5){
          TRACESTR("------> IT is the first time accoutt <-------");
            // compare the "From Account" (sfAccount) on the transaction with the account the hook is running on
            TRACESTR("Carbon: print hook and originating tx")
            TRACEVAR(hook_accid);
            TRACEVAR(otxn_accid);
            int equal = 0; BUFFER_EQUAL(equal, hook_accid, otxn_accid, 20);
            TRACEVAR(equal)
            if (equal)
                accept(SBUF("Cashback: Outgoing transaction"), 20);
        
            // execution to here means the user has sent a valid transaction FROM the account the hook is installed on
            TRACESTR("Cashback: user has sent a valid transaction FROM the account the hook is installed on");


            // fetch the sent Amount
            // Amounts can be 384 bits or 64 bits. If the Amount is an XRP value it will be 64 bits.
            unsigned char amount_buffer[48];
            int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
            int64_t drops_to_send = 1000; // this will be the default

            int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
            TRACEVAR(otxn_drops);
            drops_to_send = (int64_t)((double)otxn_drops * 0.1f); // otherwise we send 10%
            TRACEVAR(drops_to_send);

            // create a buffer to write the emitted transaction into
            unsigned char tx[PREPARE_PAYMENT_SIMPLE_SIZE];
             // we will use an XRP payment macro, this will populate the buffer with a serialized binary transaction
            // Parameter list: ( buf_out, drops_amount, to_address, dest_tag, src_tag )
            PREPARE_PAYMENT_SIMPLE(tx, drops_to_send, otxn_accid, 0, 0);

            // emit the transaction
            uint8_t emithash[32];
            int64_t emit_result = emit(SBUF(emithash), SBUF(tx));
            TRACEVAR(emit_result);
            int64_t result =   state_set(1,1, SBUF(otxn_accid));
            accept(SBUF("cashBack: Emitted transaction"), 0);
            return 0;

    }
    TRACESTR("------> tihis is not the first tx <-------");
    // accept and allow the original transaction through
    accept(SBUF("cashBack: Not Emitted transaction"), 0);
    return 0;
     
}
