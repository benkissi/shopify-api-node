import {Request} from '../adapters/abstract-http';
import {Context} from '../context';
import {ShopifyOAuth} from '../auth/oauth/oauth';
import {Session} from '../auth/session';

/**
 * Loads the current user's session, based on the given request.
 *
 * @param request  Current HTTP request
 * @param isOnline Whether to load online (default) or offline sessions (optional)
 */
export default async function loadCurrentSession(
  request: Request,
  isOnline = true,
): Promise<Session | undefined> {
  Context.throwIfUninitialized();

  const sessionId = await ShopifyOAuth.getCurrentSessionId(request, isOnline);
  if (!sessionId) {
    return Promise.resolve(undefined);
  }

  return Context.SESSION_STORAGE.loadSession(sessionId);
}
