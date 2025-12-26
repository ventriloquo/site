(setq org-html-head-extra
      (concat "<style>"
	      (with-temp-buffer (insert-file-contents "src/assets/styles.css") (buffer-string))
	      "</style>
	      <nav>
	        <a href='/'>Home</a>
	        <div>
	          <a href='/links.html'>Links</a>
	          <a href='/notes.html'>Anotações</a>
	        </div>
	      </nav>"))

;; https://www.reddit.com/r/emacs/comments/116yit2/help_me_configure_orgpublish_autositemap_to/
(defun my-sitemap-entry (entry style project)
  "Customized sitemap entry creation function, to use my /nicer/ formatting."
  (let* ((date (org-publish-find-date entry project)))
    (format "%s[[file:%s][%s]]"
	    (if date (format-time-string "[%Y-%m-%d] " date) "")
	    entry
	    (org-publish-find-title entry project))))

(setq org-export-with-section-numbers	nil
      org-export-with-toc		3
      org-html-preamble			nil
      org-html-postamble		nil
      org-export-default-language       "pt-br"
      org-export-with-todo-keywords	t
      org-confirm-babel-evaluate        nil
      org-html-doctype                  "html5"
      org-html-html5-fancy              t
      org-html-head-include-scripts     nil
      org-publish-project-alist '(("Caderno do Tukain"
				   :base-directory "src"
				   :base-extension "org"
				   :publishing-directory "public"
				   :publishing-function org-html-publish-to-html
				   :recusive nil)
				  ("notes"
				   :base-directory "src/notes"
				   :auto-sitemap t
				   :sitemap-sort-files anti-chronologically
				   :sitemap-format-entry my-sitemap-entry
				   :sitemap-title ""
				   :base-extension "org"
				   :publishing-directory "public/notes"
				   :publishing-function org-html-publish-to-html
				   :recusive nil)
				  ("static"
				   :base-directory "src/assets"
				   :base-extension "jpg\\|png\\|webp\\|ttf\\|gif\\|css\\|js\\|html"
				   :recusive t
				   :publishing-directory "public/assets"
				   :publishing-function org-publish-attachment)))

(org-publish-all t)

