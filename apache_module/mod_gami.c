#include "httpd.h"
#include "http_config.h"
#include "http_core.h"
#include "http_log.h"
#include "http_main.h"
#include "http_protocol.h"
#include "http_request.h"
#include "util_script.h"
#include "http_connection.h"
#include "apr_network_io.h"

#include "jsmn.h"

#include "apr_strings.h"

#include <stdio.h>


static const char *trace = NULL;
static apr_table_t *static_calls_made = NULL;

static apr_pool_t *x_pool = NULL;
static apr_pool_t *x_subpool = NULL;

static const char *msg_format = "v=%u&ready=%u&busy=%u";

#define MSG_VERSION (1)

module AP_MODULE_DECLARE_DATA gami_module;

static int gami_handler(request_rec *r)
{
	/*apr_table_t*GET; 
	apr_array_header_t*POST; 

	ap_args_to_table(r, &GET); 
	ap_parse_form_data(r, NULL, &POST, -1, 8192);*/

    /* Set the appropriate content type */
    ap_set_content_type(r, "text/html");
	//ap_set_content_type(r, "application/json");

    /* Print out the IP address of the client connecting to us: */
    ap_rprintf(r, "<h2>Hello, %s</h2>", r->useragent_ip);
	ap_rprintf(r, "<h2>Hello filename, %s</h2>", r->filename);
    
    /* If we were reached through a GET or a POST request, be happy, else sad. */
    if ( !strcmp(r->method, "POST") || !strcmp(r->method, "GET") ) {
        ap_rputs("You used a GET or a POST method, that makes us happy!<br/>", r);
    }
    else {
        ap_rputs("You did not use POST or GET, that makes us sad :(<br/>", r);
    }

    /* Lastly, if there was a query string, let's print that too! */
    if (r->args) {
        ap_rprintf(r, "Your query string was: %s", r->args);
    }
	
	apr_sockaddr_t *sockAddr;
	apr_socket_t *sock;
	apr_status_t rv;
	char buf[256] = "hi";
	apr_uint32_t ready = 0;
    apr_uint32_t busy = 0;
	apr_size_t len;
	//apr_size_t length = 0;
	//apr_size_t	
	char buflit[256];
	apr_size_t bufsiz = 256;

	rv = apr_sockaddr_info_get(&sockAddr, "127.0.0.1", APR_INET, 3700, 0, r->pool);
	if (rv) {
		ap_log_error(APLOG_MARK, APLOG_WARNING, rv,
					 NULL, APLOGNO(02097) "Gami: apr_sockaddr_info_get failed");
	}
	
	//rv = apr_socket_create(&sock, sockAddr->family, SOCK_STREAM, APR_PROTO_TCP, r->pool);
	// SOCK_DGRAM, APR_PROTO_UDP; SOCK_STREAM, APR_PROTO_TCP
	rv = apr_socket_create(&sock, APR_INET, SOCK_STREAM, APR_PROTO_TCP, r->pool);
	if (rv) {
            ap_log_error(APLOG_MARK, APLOG_WARNING, rv,
                         NULL, APLOGNO(02097) "Gami: apr_socket_create failed");
    }
	
	//length = strlen("hi") + 1;
	len = apr_snprintf(buf, sizeof(buf), msg_format, MSG_VERSION, ready, busy);
	//rv = apr_socket_send(sock, "hi", &length);
	rv = apr_socket_sendto(sock, sockAddr, 0, buf, &len);
	if (rv) {
	
			ap_rputs("error message: ", r);
			
			ap_rputs(apr_strerror(rv, buflit, bufsiz), r);
			
            ap_log_error(APLOG_MARK, APLOG_WARNING, rv,
                         NULL, APLOGNO(02097) "Gami: apr_socket_send failed");
    }
	
    return OK;
}

static void register_hooks(apr_pool_t *pool)
{
    /* Create a hook in the request handler, so we get called when a request arrives */
    ap_hook_handler(gami_handler, NULL, NULL, APR_HOOK_LAST);
}

module AP_MODULE_DECLARE_DATA   gami_module =
{
    STANDARD20_MODULE_STUFF,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    register_hooks   /* Our hook registering function */
};